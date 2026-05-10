const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

// kết nối đến Redis để đọc dữ liệu sản phẩm
const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
client.on("error", (err) => console.error("Redis Client Error", err));

async function start() {
  await client.connect();
  console.log("Product PU connected to Redis");

  // danh sách sản phẩm từ Redis (list + hash)
  app.get("/products", async (req, res) => {
    try {
      const ids = await client.lRange("product_list", 0, -1);
      const products = [];
      for (const id of ids) {
        const p = await client.hGetAll(`product:${id}`);
        const stock = await client.get(`stock:${id}`);
        products.push({ ...p, price: Number(p.price), stock: Number(stock) });
      }
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // chi tiết sản phẩm theo id
  app.get("/products/:id", async (req, res) => {
    try {
      const p = await client.hGetAll(`product:${req.params.id}`);
      if (!p.id) return res.status(404).json({ error: "Product not found" });
      const stock = await client.get(`stock:${req.params.id}`);
      res.json({ ...p, price: Number(p.price), stock: Number(stock) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`PU1 - Product Service running on port ${PORT}`);
  });
}

start();
