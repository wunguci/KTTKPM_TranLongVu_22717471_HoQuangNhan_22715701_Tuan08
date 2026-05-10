const { connectRedis, client } = require('./redisClient');

const products = [
  {
    "id": "1",
    "name": "Áo len cashmere",
    "description": "Áo len cashmere với thiết kế tinh tế, sang trọng. Giữ ấm tốt và nhẹ nhàng, phù hợp phong cách thanh lịch mùa đông.",
    "price": 9500000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868125/LOOK_F_25_3_LOOK_075_E08_lomrey.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868096/544S37A0020X9000_E01_dfbjp1.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868135/LOOK_F_25_3_LOOK_075_E01-1_tm8ktp.jpg"
    ]),
    "stock": 295,
    "soldCount": 0,
    "maxPerUser": 3,
    "categoryId": "aolen",
    "sex": "Nữ",
    "xuatXu": "Pháp",
    "chatLieu": "Len cashmere",
    "rating": 4.9,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 85 },
      { "size": "M", "color": "Đen", "stock": 90 },
      { "size": "L", "color": "Đen", "stock": 120 }
    ])
  },
  {
    "id": "2",
    "name": "Áo quây Dioriviera",
    "description": "Chiếc áo ống từ vải len kỹ thuật cao cấp màu đen, điểm nhấn viền màu be nhạt tương phản và các nút trang trí hình ngôi sao bằng kim loại — biểu tượng đặc trưng của Dior.",
    "price": 3900000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/c_crop,w_500/v1748868404/544E08A5005X9000_E01-1_gj0qhi.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/c_crop,w_500/v1748868408/544E08A5005X9000_E08-1_jryx2r.jpg"
    ]),
    "stock": 98,
    "soldCount": 0,
    "maxPerUser": 2,
    "categoryId": "aothun",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Cotton",
    "rating": 4.8,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "L", "color": "Đen", "stock": 98 }
    ])
  },
  {
    "id": "3",
    "name": "Dây buộc tóc Sweet",
    "description": "Nơ lớn bằng vải grosgrain co giãn màu đen, điểm xuyết chữ ký CD bằng kim loại hoàn thiện màu vàng nhạt. Tô điểm cho mọi kiểu tóc với nét chạm couture đẳng cấp.",
    "price": 1200000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868471/CPS00164EGGRC900_E01_dzu9iv.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868589/CPS00164EGGRC900_E09_vued8a.jpg"
    ]),
    "stock": 196,
    "soldCount": 0,
    "maxPerUser": 5,
    "categoryId": "phukien",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Cotton",
    "rating": 4.7,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 196 }
    ])
  },
  {
    "id": "4",
    "name": "Túi Caro Soft size trung",
    "description": "Da cừu màu đen cao cấp với đường chần Macrocannage đặc trưng và khóa xoay CD kim loại hoàn thiện màu vàng cổ. Dây đeo xích mắt xích hình chữ CD có thể tháo rời.",
    "price": 2500000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868595/S5573OWHPM900_E01_wpig81.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868603/S5573OWHPM900_E06_kuwnjf.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868728/LOOK_F_24_3_LOOK_011_E10_w1wlat.jpg"
    ]),
    "stock": 63,
    "soldCount": 0,
    "maxPerUser": 1,
    "categoryId": "tui",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Da cừu",
    "rating": 4.9,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 63 }
    ])
  },
  {
    "id": "5",
    "name": "Áo len cổ buộc dây",
    "description": "Cashmere đen tuyền với chi tiết cổ buộc dây độc đáo, đính nút Dior Tribales có hạt ngọc trai nhựa CD. Phom tay lỡ duyên dáng, kết hợp linh hoạt từ casual đến sang trọng.",
    "price": 5800000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868745/LOOK_F_25_2_LOOK_132_E01_mzaalm.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868756/LOOK_F_25_2_LOOK_132_E12_vhwygm.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868781/354S48AM053X9000_E08_ms9wad.jpg"
    ]),
    "stock": 1081,
    "soldCount": 0,
    "maxPerUser": 2,
    "categoryId": "aolen",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Len cashmere",
    "rating": 4.8,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 587 },
      { "size": "M", "color": "Đen", "stock": 197 },
      { "size": "L", "color": "Đen", "stock": 197 },
      { "size": "XL", "color": "Đen", "stock": 100 }
    ])
  },
  {
    "id": "6",
    "name": "Quần ống loe",
    "description": "Gabardine pha len virgin wool và lụa đen cao cấp. Phom ống loe tạo hiệu ứng chân dài thanh thoát, chi tiết xếp ly và túi xẻ hai bên hoàn thiện vẻ ngoài chỉn chu.",
    "price": 8100000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748869882/211P07A1166X9000_E01_xboogc.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748869903/211P07A1166X9000_E09_wx5c8o.jpg"
    ]),
    "stock": 1112,
    "soldCount": 0,
    "maxPerUser": 3,
    "categoryId": "quan",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Gabardine pha len virgin wool và lụa",
    "rating": 4.7,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 987 },
      { "size": "M", "color": "Đen", "stock": 125 }
    ])
  },
  {
    "id": "7",
    "name": "Khuyên tai Tribales",
    "description": "Hạt ngọc trai nhựa trắng kết hợp chi tiết trái tim lãng mạn, ánh kim tông vàng và pha lê tông bạc. Thiết kế bất đối xứng độc đáo với hiệu ứng ngọc trai phía sau vành tai.",
    "price": 15500000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868881/E4149WOMCYD03S_E03_hsalue.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868890/E4149WOMCYD03S_E02_eaeq5w.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868986/E4149WOMCYD03S_E09_hsrm9g.jpg"
    ]),
    "stock": 68,
    "soldCount": 0,
    "maxPerUser": 1,
    "categoryId": "trangsuc",
    "sex": "Nữ",
    "xuatXu": "Đức",
    "chatLieu": "Ngọc trai, Vàng",
    "rating": 5.0,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "free", "color": "Trắng", "stock": 68 }
    ])
  },
  {
    "id": "8",
    "name": "Áo len dáng rộng J'Adior 8",
    "description": "Cashmere dáng boxy với dòng chữ J'Adior 8 dệt nổi màu trắng tương phản ở mặt sau. Bo chun ở gấu và cổ tay kết hợp tinh tế giữa phong cách thể thao và sang trọng.",
    "price": 6700000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868787/924S55AM009X9330_E01-2_hcemsn.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868794/924S55AM009X9330_E08_mjsqbc.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868798/924S55AM009X8805_E01-2_zky0yi.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748868829/LOOK_F_23_4_LOOK_776_E06_s9dylw.jpg"
    ]),
    "stock": 1497,
    "soldCount": 0,
    "maxPerUser": 3,
    "categoryId": "aolen",
    "sex": "Nữ",
    "xuatXu": "Ý",
    "chatLieu": "Len cashmere",
    "rating": 4.8,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Đen", "stock": 996 },
      { "size": "M", "color": "Đen", "stock": 100 },
      { "size": "L", "color": "Đen", "stock": 100 },
      { "size": "S", "color": "Xám", "stock": 101 },
      { "size": "M", "color": "Xám", "stock": 100 }
    ])
  },
  {
    "id": "9",
    "name": "Áo khoác thêu hoa linh lan Couture",
    "description": "Gabardine cotton màu be với chi tiết thêu Christian Dior Couture và bông hoa linh lan ẩn bên trong — lời tri ân đặc biệt đến loài hoa biểu tượng của nhà sáng lập. Sản xuất tại Ý.",
    "price": 8100000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748869946/593C226A3045C181_E01_hsswno.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748869958/LOOK_H_25_3_LOOK_009_E01_fijgzz.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748869963/LOOK_H_25_3_LOOK_009_E02_aicfbi.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748870025/593C226A3045C181_E08_ag0fpw.jpg"
    ]),
    "stock": 540,
    "soldCount": 0,
    "maxPerUser": 2,
    "categoryId": "aokhoac",
    "sex": "Nam",
    "xuatXu": "Ý",
    "chatLieu": "Cotton gabardine",
    "rating": 4.9,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Trắng", "stock": 83 },
      { "size": "M", "color": "Trắng", "stock": 69 },
      { "size": "L", "color": "Trắng", "stock": 388 }
    ])
  },
  {
    "id": "10",
    "name": "Áo vest Icons",
    "description": "Cashmere thượng hạng với lớp lót cupro mịn màng, ve áo nhọn sắc sảo và khuy bọc vải tinh tế. Khoản đầu tư xứng đáng cho tủ đồ, dễ phối từ công sở đến smart-casual.",
    "price": 13000000,
    "flashSalePrice": null,
    "imageUrls": JSON.stringify([
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748870351/LOOK_H_25_3_LOOK_010_E01_cb15q5.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748870345/593C222A1040C900_E01_otdwed.jpg",
      "https://res.cloudinary.com/dnbc9k0yn/image/upload/v1748870375/LOOK_H_25_3_LOOK_010_E02_tqj3f9.jpg"
    ]),
    "stock": 5978,
    "soldCount": 0,
    "maxPerUser": 2,
    "categoryId": "vest",
    "sex": "Nam",
    "xuatXu": "Ý",
    "chatLieu": "Cashmere",
    "rating": 5.0,
    "reviewCount": 0,
    "variants": JSON.stringify([
      { "size": "S", "color": "Xám", "stock": 985 },
      { "size": "M", "color": "Xám", "stock": 999 },
      { "size": "L", "color": "Xám", "stock": 998 },
      { "size": "S", "color": "Đen", "stock": 1000 },
      { "size": "M", "color": "Đen", "stock": 1000 },
      { "size": "L", "color": "Đen", "stock": 996 }
    ])
  }
];

async function seed() {
    try {
        await connectRedis();
        console.log('Connected to Redis...');

        await client.flushAll();
        console.log('Cleared existing data.');

        for (const p of products) {
            await client.hSet(`product:${p.id}`, {
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price.toString(),
                flashSalePrice: (p.flashSalePrice || p.price).toString(),
                imageUrls: p.imageUrls,
                stock: p.stock.toString(),
                reservedStock: '0',
                soldCount: p.soldCount.toString(),
                flashSaleStartTime: (Date.now() - 3600000).toString(),
                flashSaleEndTime: (Date.now() + 86400000).toString(),
                maxPerUser: p.maxPerUser.toString(),
                active: 'true',
                categoryId: p.categoryId,
                sex: p.sex || '',
                xuatXu: p.xuatXu || '',
                chatLieu: p.chatLieu || '',
                variants: p.variants || '[]',
                rating: p.rating.toString(),
                reviewCount: p.reviewCount.toString(),
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString()
            });
            
            await client.set(`stock:${p.id}`, p.stock.toString());
            await client.lPush('product_list', p.id);
        }

        console.log('Luxury Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
