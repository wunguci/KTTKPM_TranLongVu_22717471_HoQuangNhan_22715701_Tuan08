const redis = require("redis");

// Tạo client Redis, ưu tiên URL từ biến môi trường
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Ghi log lỗi kết nối Redis để dễ debug
client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  // Chỉ kết nối nếu client chưa mở
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

module.exports = { connectRedis, client };
