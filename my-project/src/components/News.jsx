import React from 'react'
import "../index.css"

const newsData = [
    {
      id: 1,
      title: 'Apple ra mắt iPhone 15 mới',
      content: 'Apple đã công bố phiên bản mới nhất của dòng sản phẩm iPhone, mang tên iPhone 15, với nhiều cải tiến về hiệu năng và camera.',
      image: 'https://vcdn-sohoa.vnecdn.net/2023/02/27/iPhone-15-Pro-Burgandy-Feature-9729-9375-1677434034.jpg',
    },
    {
      id: 2,
      title: 'Theo một số đồn đoán, các mẫu iPhone 15 Pro có thể tăng giá',
      content: 'Theo Jeff Pu - nhà phân tích công nghệ tại Haitong International Securities, iPhone 15 Pro và iPhone 15 Pro Max sắp ra mắt của Apple có thể đi kèm với mức giá cao hơn do những nâng cấp đáng kể về phần cứng.',
      image: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2023/03/theo-mot-so-don-doan-cac-mau-iphone-15-pro-co-the-tang-gia1.jpg.webp',
    },
    {
      id:3,
      title:'iPhone 15 Plus có gì mới?',
      content:'Phiên bản bộ nhớ: iPhone 15 Plus 128GB, iPhone 15 Plus 256GB, iPhone 15 Plus 512GB.Màu sắc iPhone 15 Plus: Đen, xanh dương, hồng, tím, trắng và đỏ.Thiết kế iPhone 15 Plus: Cũng như iPhone 15 tiêu chuẩn, phần tai thỏ sẽ hoàn toàn được thay thay thế bằng thiết kế màn hình đục lỗ hình viên thuốc được Apple gọi là Dynamic Island.',
      image:'https://cdn.tgdd.vn/Files/2023/03/17/1518606/ogmacrumorscopy-100423-205920.jpg',
    },
    {
      id:4,
      title:'iPhone 15 Series có Chip Apple A17 Bionic với quy trình 3nm mới',
      content:'Giống với iPhone 14 series, iPhone 15 cũng sẽ được Apple tiếp tục trang bị bộ vi xử lý tương tự. Tức có nghĩa là chip Apple A16 Bionic 4nm sẽ được dùng trên iPhone 15 và iPhone 15 Plus, còn các dòng Pro sẽ được trang bị con chip Apple A17 Bionic 3nm đời mới nhất..',
      image:'https://blogcdn.muaban.net/wp-content/uploads/2023/05/24225856/iPhone-15-khi-nao-ra-mat-09.jpg',
    },
    // Thêm các tin tức khác tại đây...
  ];
  
  // Component tin tức
  function NewsItem({ title, content, image }) {
    return (
      <div className="news-item">
        <img className="news-image" src={image} alt={title} />
        <div className="news-content">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    );
  }
export default function News() {
  return (
    <div className="news-page">
    <h1>Tin tức điện thoại</h1>
    <div className="news-container">
      {newsData.map((item) => (
        <NewsItem
          key={item.id}
          title={item.title}
          content={item.content}
          image={item.image}
        />
      ))}
    </div>
  </div>
  )
}
