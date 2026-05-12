# Flash Sale System — Space-Based Architecture (SBA)

**Môn:** Kiến trúc và Thiết kế Phần mềm | **Tuần 08**

| Thành viên    | MSSV     |
| ------------- | -------- |
| Trần Long Vũ  | 22717471 |
| Hồ Quang Nhân | 22715701 |

---

## Kiến trúc

Hệ thống áp dụng **Space-Based Architecture (SBA)** để xử lý tải cao (flash sale). Các Processing Unit (PU) giao tiếp qua **Redis In-memory Data Grid** để tối ưu hóa hiệu năng và tránh nghẽn Database.

```
Frontend (React)
    │
    ▼
Nginx (Load Balancer/Gateway) :80
    │
    ├──► User Service      :8085 (MySQL)
    ├──► Product Service   :8081 (Redis)
    ├──► Cart Service      :8082 (Redis)
    ├──► Order Service     :8083 (Redis)
    └──► Inventory Service :8084 (Redis)
            │
      Redis Master/Replica
```

---

## Phân công

### Trần Long Vũ — 22717471

- **Product Service** (`/services/product-service`)
    - Quản lý danh sách sản phẩm luxury.
    - Xử lý thông tin chi tiết sản phẩm.
- **Cart Service** (`/services/cart-service`)
    - Quản lý giỏ hàng tạm thời trên Redis.
    - Tính toán tổng tiền, số lượng sản phẩm.
- **User Service** (`/services/user-service`)
    - Xác thực người dùng (Login/Register).
    - Lưu thông tin vào MySQL.
- **Frontend**
    - Trang danh sách sản phẩm, chi tiết sản phẩm.
    - Logic thêm vào giỏ hàng, hiển thị giỏ hàng.

### Hồ Quang Nhân — 22715701

- **Inventory Service** (`/services/inventory-service`)
    - Xử lý trừ kho thời gian thực với Redis.
    - Đảm bảo tính nhất quán dữ liệu khi có hàng ngàn request.
- **Order Service** (`/services/order-service`)
    - Tạo đơn hàng sau khi thanh toán thành công.
    - Lưu trữ lịch sử giao dịch.
- **Cấu hình Hệ thống**
    - `nginx.conf`, `docker-compose.yml`.
    - Script seeding dữ liệu sản phẩm Dior Luxury.
- **Frontend**
    - Trang Login, trang đặt hàng (Checkout), kết quả đơn hàng.

---

## Cách chạy

**Yêu cầu:** Docker Desktop đang chạy, Node.js ≥ 18

```bash
# Bước 1: Khởi động Infrastructure (Redis, MySQL)
docker compose up -d

# Bước 2: Cài đặt dependencies cho tất cả services
npm run install:all

# Bước 3: Seed dữ liệu sản phẩm vào Redis
npm run seed

# Bước 4: Chạy toàn bộ backend services
npm run start:all
```

---

## Services

| Service           | Port | Data Store  |
| ----------------- | ---- | ----------- |
| User Service      | 8085 | MySQL       |
| Product Service   | 8081 | Redis       |
| Cart Service      | 8082 | Redis       |
| Inventory Service | 8084 | Redis       |
| Order Service     | 8083 | Redis       |
| Redis Master      | 6380 | In-memory   |
| MySQL             | 3308 | Persistence |
