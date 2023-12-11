import React from "react";
import PromotionListTitle from "./PromotionListTitle";
import News from "./News";
import NewKhuyenMai from "./NewKhuyenMai";

const PromotionPage = () => {
  return (
    <div>
      <div
        class="nav-tabs"
        style={{
          margin: "auto",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <a href="#boxHotSale" class="nav-item button__scroll">
          <img
            alt="boxHotSale"
            src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/hot-sale-mascot.png"
            class="nav-item__img"
          />
        </a>
        <a href="#boxUuDai" class="nav-item button__scroll active">
          <img
            alt="boxUuDai"
            src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/payment-mascot.png"
            class="nav-item__img"
          />{" "}
        </a>
        <a href="#boxPromotion" class="nav-item button__scroll">
          <img
            alt="boxPromotion"
            src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/deal-mascot.png"
            class="nav-item__img"
          />{" "}
        </a>
      </div>
      <PromotionListTitle />
      <NewKhuyenMai />
    </div>
  );
};

export default PromotionPage;
