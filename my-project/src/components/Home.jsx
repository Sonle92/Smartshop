import React from "react";
import Slide from "./Slide";
import anh1 from "../image/slide1.png";
import anh2 from "../image/slide6.jpg";
import anh3 from "../image/slide7.jpg";
import banner1 from "../image/banner.jpg";
import banner2 from "../image/banner14s.jpg";
import banner3 from "../image/banner15.jpg";
import anh4 from "../image/stevenjob.jpg";
import anh5 from "../image/anh5.jpg";
import "../index.css";
const newsData = [
  {
    id: 1,
    image: banner1,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
    image: banner3,
  },
];

function NewsItem({ title, content, image }) {
  return (
    <div style={{ width: "50%" }}>
      <img
        style={{
          width: "80%",
          height: "150px",
          margin: "33px",
          borderRadius: 15,
        }}
        src={image}
        alt={title}
      />
      <div className="news-content"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <div>
        <Slide sl1={anh1} sl2={anh2} sl3={anh3} />
      </div>
      <div className="news-page">
        <div style={{ display: "flex" }}>
          {newsData.map((item) => (
            <NewsItem key={item.id} image={item.image} />
          ))}
        </div>
      </div>
      <div className="contents">
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            margin: "20px",
            borderRadius: 20,
            height: "800px",
          }}
        >
          <h1 style={{ textAlign: "center", color: "red" }}>
            LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN CỦA IPHONE
          </h1>
          <div className="chill">
            <div
              style={{
                float: "left",
                width: "50%",
                lineHeight: "40px",
                color: "white",
                backgroundColor: "black",
                padding: "15px",
                borderRadius: "50px",
              }}
            >
              iPhone là dòng điện thoại thông minh được phát triển từ Apple Inc,
              được ra mắt lần đầu tiên bởi Steve Jobs và mở bán năm 2007. Bên
              cạnh tính năng của một máy điện thoại thông thường, iPhone còn
              được trang bị màn hình cảm ứng, camera, khả năng chơi nhạc và
              chiếu phim, trình duyệt web... Phiên bản thứ hai là iPhone 3G ra
              mắt tháng 7 năm 2008, được trang bị thêm hệ thống định vị toàn
              cầu, mạng 3G tốc độ cao.
            </div>
            <img className="image4" src={anh4} alt="" />
          </div>
          <hr />
          <h1 style={{ textAlign: "center", color: "red" }}>
            IPHONE CÓ NHỮNG MÃ MÁY NÀO?
          </h1>
          <div className="chill">
            <div
              style={{
                float: "right",
                width: "50%",
                lineHeight: "40px",
                color: "white",
                backgroundColor: "black",
                padding: "15px",
                borderRadius: "50px",
              }}
            >
              Những chiếc iPhone do Apple phân phối tại thị trường nước nào thì
              sẽ mang mã của nước đó. Ví dụ: LL: Mỹ, ZA: Singapore, TH: Thái
              Lan, JA: Nhật Bản, Những mã này xuất hiện tại Việt Nam đều là hàng
              xách tay, nhập khẩu. Còn tại Việt Nam, iPhone sẽ được mang mã
              VN/A. Tất cả các mã này đều là hàng chính hãng phân phối của
              Apple. Lợi thế khi bạn sử dụng iPhone mã VN/A đó là chế độ bảo
              hành tốt hơn với 12 tháng theo tiêu chuẩn của Apple.
            </div>
            <img className="image5" src={anh5} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
