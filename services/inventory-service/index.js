const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = 8084;

app.use(cors());
app.use(express.json());

const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6380' });
client.on('error', (err) => console.error('Redis Client Error', err));

async function start() {
    await client.connect();
    console.log('Inventory PU connected to Redis');

    app.get('/stock/:productId', async (req, res) => {
        try {
            const stock = await client.get(`stock:${req.params.productId}`);
            res.json({ productId: req.params.productId, stock: Number(stock) || 0 });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Atomic decrement script (Lua)
    // Returns 1 if success, -1 if out of stock, -2 if product not found
    const decrStockScript = `
        local stock = redis.call("get", KEYS[1])
        if not stock then return -2 end
        if tonumber(stock) < tonumber(ARGV[1]) then return -1 end
        local newStock = redis.call("decrby", KEYS[1], ARGV[1])
        redis.call("hset", KEYS[2], "stock", newStock)
        return newStock
    `;

    app.post('/stock/decrease', async (req, res) => {
        const { productId, quantity } = req.body;
        try {
            const result = await client.eval(decrStockScript, {
                keys: [`stock:${productId}`, `product:${productId}`],
                arguments: [(quantity || 1).toString()]
            });

            if (result === -1) return res.status(400).json({ error: 'Out of stock' });
            if (result === -2) return res.status(404).json({ error: 'Product not found' });

            res.json({ message: 'Stock decreased', remaining: result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`PU4 - Inventory Service running on port ${PORT}`);
    });
}

start();
