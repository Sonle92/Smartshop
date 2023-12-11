import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import image from "../image/Mylogo.png";
import "../App.css";

export default function Header() {
  return (
    <div style={{ height: "70px" }}>
      <div className="Nav">
        <a href="/" className="items">
          <img src={image} alt="" width={70} height={70} />
        </a>
        <a href="/product" className="items">
          <div>IPHONE</div>
        </a>
        <a href="/news" className="items">
          <div>TIN TỨC</div>
        </a>
        <a href="/promotion" className="items">
          <div>KHUYẾN MẠI</div>
        </a>
        <a href="/cart" className="items">
          <div>
            <span style={{ fontSize: 25 }}>
              <BsFillCartPlusFill />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
