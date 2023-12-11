import React from "react";
import { CiClock2 } from "react-icons/ci";

export default function NewPromotion() {
  const newsData = [
    {
      id: 1,
      title:
        "GIẢM 1.5 TRIỆU KHI THANH TOÁN IPHONE 15 SERIES BẰNG THẺ TÍN DỤNG HSBC",
      image:
        "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/6/9/690-300-max-hsbc-sliding.png",
      time: "Còn lại 20 ngày",
    },
    {
      id: 2,
      title: "MỞ THẺ TÍN DỤNG VP BANK - NHẬN NGAY ƯU ĐÃI 500K",
      image:
        "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/s/l/sliding-vpbank-bew0995.png",
      time: "Còn lại 40 ngày",
    },
    {
      id: 3,
      title: "GIẢM 1 TRIỆU KHI THANH TOÁN IPHONE 15 SERIES BẰNG THẺ UOB",
      image: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/uob-t11.png",
      time: "Còn lại 30 ngày",
    },
    {
      id: 4,
      title: "CHƯƠNG TRÌNH ƯU ĐÃI THANH TOÁN VNPAY-QR CHO IPHONE 15 SERIES",
      image: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/vnpay-t11.png",
      time: "Còn lại 10 ngày",
    },

    {
      id: 5,
      title:
        "GIẢM 1 TRIỆU KHI THANH TOÁN IPHONE 15 SERIES BẰNG THẺ TÍN DỤNG SHINHAN",
      image:
        "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/1/2/1200-400-max-shinhan.png",
      time: "Còn lại 15 ngày",
    },

    {
      id: 6,
      title: "GIẢM 500.000VNĐ KHI THANH TOÁN BẰNG THẺ TÍN DỤNG OCB",
      image:
        "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/1/2/1200-400-max-ocb.png",
      time: "Còn lại 20 ngày",
    },
    // Thêm các tin tức khác tại đây...
  ];
  // Component tin tức
  function NewsItem({ title, image, time }) {
    return (
      <div className="news-item">
        <img className="news-image" src={image} alt={title} />
        <div className="news-content">
          <h2>{title}</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <CiClock2 />
            </div>
            <div style={{ paddingLeft: "5px" }}>{time}</div>
          </div>
          <div>
            <a
              href=" "
              style={{
                textDecoration: "none",
                backgroundColor: "red",
                color: "white",
                padding: "7px",
                borderRadius: "5px",
              }}
            >
              Xem chi tiết
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="news-page">
      <div className="news-container">
        {newsData.map((item) => (
          <NewsItem
            key={item.id}
            title={item.title}
            content={item.content}
            image={item.image}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
}
