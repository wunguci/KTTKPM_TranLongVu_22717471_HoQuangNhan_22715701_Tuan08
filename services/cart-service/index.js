const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
const PORT = 8082;

app.use(cors());
app.use(express.json());

// kết nối đến Redis để lưu/đọc giỏ hàng
const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6380",
});
client.on("error", (err) => console.error("Redis Client Error", err));

async function start() {
  await client.connect();
  console.log("Cart PU connected to Redis");

  app.use((req, res, next) => {
    req.userId = req.headers["x-user-id"] || "user1";
    next();
  });

  app.post("/cart/add", async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ error: "Missing productId" });

    try {
      // kiểm tra sản phẩm có tồn tại trong Redis
      const exists = await client.exists(`product:${productId}`);
      if (!exists) return res.status(404).json({ error: "Product not found" });

      // tăng số lượng trong giỏ hàng (Hash)
      await client.hIncrBy(`cart:${req.userId}`, productId, quantity || 1);
      res.json({ message: "Added to cart" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/cart", async (req, res) => {
    try {
      // lấy toàn bộ item trong giỏ
      const items = await client.hGetAll(`cart:${req.userId}`);
      const cart = [];
      for (const [productId, quantity] of Object.entries(items)) {
        const product = await client.hGetAll(`product:${productId}`);
        cart.push({
          productId,
          name: product.name,
          price: Number(product.price),
          quantity: Number(quantity),
        });
      }
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`PU2 - Cart Service running on port ${PORT}`);
  });
}

start();
