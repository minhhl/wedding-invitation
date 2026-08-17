# Ảnh cưới — thư mục để thêm ảnh thật

Đặt ảnh vào đây theo đúng tên file bên dưới, sau đó báo lại — mình sẽ cập nhật
`src/lib/images.ts` để trang web dùng ảnh thật thay cho ảnh mẫu (Unsplash).

## Cần những ảnh gì

| File                  | Dùng ở đâu                          | Tỉ lệ khuyên dùng |
| ---------------------- | ------------------------------------ | ------------------ |
| `cover.jpg`             | Nền màn hình mở thiệp                | dọc hoặc ngang, tối thiểu 1600px chiều rộng |
| `hero.jpg`              | Banner đầu trang (có parallax)       | ngang, tối thiểu 2000px chiều rộng |
| `og.jpg`                | Ảnh chia sẻ khi gửi link (Facebook, Zalo…) | ngang 1200×630 |
| `gallery/01.jpg` … `gallery/09.jpg` | Album ảnh (masonry + lightbox) | tối thiểu 900px chiều rộng, có thể trộn ảnh dọc/ngang/vuông |

Có thể thêm nhiều hơn 9 ảnh gallery — chỉ cần đặt tên tiếp `10.jpg`, `11.jpg`... và báo lại.

## Lưu ý

- Nên nén ảnh trước khi đưa vào (khuyên dùng `.jpg`/`.webp`, mỗi ảnh dưới ~500KB) để trang tải nhanh trên mobile.
- Không bắt buộc phải có đủ tất cả — có ảnh nào thì gửi ảnh đó, mình sẽ wire dần.
