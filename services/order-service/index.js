const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = 8083;

app.use(cors());
app.use(express.json());

const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6380' });
client.on('error', (err) => console.error('Redis Client Error', err));

// Lua script for atomic stock reduction (same as Inventory PU for direct Grid access)
const decrStockScript = `
    local stock = redis.call("get", KEYS[1])
    if not stock then return -2 end
    if tonumber(stock) < tonumber(ARGV[1]) then return -1 end
    local newStock = redis.call("decrby", KEYS[1], ARGV[1])
    redis.call("hset", KEYS[2], "stock", newStock)
    return newStock
`;

const os = require('os');
const hostname = os.hostname();

async function start() {
    await client.connect();
    console.log(`Order PU [${hostname}] connected to Redis`);

    app.use((req, res, next) => {
        req.userId = req.headers['x-user-id'] || 'user1';
        next();
    });

    app.post('/checkout', async (req, res) => {
        const userId = req.userId;
        console.log(`[Checkout] Starting for user: ${userId}`);
        try {
            // 1. Get cart from Data Grid
            const cartItems = await client.hGetAll(`cart:${userId}`);
            console.log(`[Checkout] Cart items:`, cartItems);
            
            if (Object.keys(cartItems).length === 0) {
                console.warn(`[Checkout] User ${userId} has an empty cart.`);
                return res.status(400).json({ error: 'Cart is empty' });
            }

            // 2. Process items (Atomic stock reduction on Data Grid)
            const results = [];
            const orderId = Date.now().toString();

            for (const [productId, quantity] of Object.entries(cartItems)) {
                console.log(`[Checkout] Decreasing stock for ${productId} by ${quantity}`);
                const result = await client.eval(decrStockScript, {
                    keys: [`stock:${productId}`, `product:${productId}`],
                    arguments: [quantity.toString()]
                });

                if (result < 0) {
                    console.error(`[Checkout] Stock error for ${productId}: ${result}`);
                    return res.status(400).json({ error: `Insufficient stock for product ${productId}` });
                }
                results.push({ productId, quantity: Number(quantity) });
            }

            // 3. Save order to Data Grid (Order history)
            await client.set(`order:${orderId}`, JSON.stringify({
                userId: userId,
                items: results,
                timestamp: new Date()
            }));

            // 4. Clear cart
            await client.del(`cart:${userId}`);
            console.log(`[Checkout] Order ${orderId} created successfully for ${userId}`);

            res.json({ message: 'Order placed successfully', orderId, items: results });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`PU3 - Order Service [${hostname}] running on port ${PORT}`);
    });
}

start();
