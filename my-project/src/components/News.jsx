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
