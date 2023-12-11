import React from "react";

function PromotionListTitle() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/uudaithanhtoanbanner.png"
        alt="Ưu đãi đối tác"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <div class="option__item button__select-promotion">
          <div class="option__img">
            <img
              src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/vidientuicon.png"
              alt="Deal hot ví điện tử"
            />
          </div>{" "}
          <p class="option__text">Deal hot ví điện tử</p>
        </div>
        <div class="option__item button__select-promotion">
          <div class="option__img">
            <img
              src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/present.png"
              alt="Mở thẻ nhận quà"
            />
          </div>{" "}
          <p class="option__text">Mở thẻ nhận quà</p>
        </div>
        <div class="option__item button__select-promotion">
          <div class="option__img">
            <img
              src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/card.png"
              alt="Ưu đãi thẻ ngân hàng"
            />
          </div>{" "}
          <p class="option__text">Ưu đãi thẻ ngân hàng</p>
        </div>
        <div class="option__item button__select-promotion">
          <div class="option__img">
            <img
              src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/pig.png"
              alt="Mua trước trả sau"
            />
          </div>{" "}
          <p class="option__text">Mua trước trả sau</p>
        </div>
      </div>
    </div>
  );
}

export default PromotionListTitle;
