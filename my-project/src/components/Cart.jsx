import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../constants/URLS";
import "../App.css";
import axios from "axios";
import numeral from "numeral";
import {
  addTocart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cart";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const cart1 = useSelector((state) => state.cart.cartTotalQuantity);
  const cart2 = useSelector((state) => state.cart.cartTotalAmount);
  const cart3 = useSelector((state) => state.cart.cartItems);
  const cartItemDetails = cart3.map((item) => ({
    name: item.name,
    cartQuantity: item.cartQuantity,
  }));

  const dispatch = useDispatch();
  //khai báo biến form

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    cartItems: cartItemDetails,
    tongtien: 0,
    tongsoluong: 0,
    trangthai: "Đang xử lý",
  });
  //cap nhap lai tong tien va tong san pham
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tongtien: cart2,
      tongsoluong: cart1,
    }));
  }, [cart1, cart2]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  useEffect(() => {
    const updatedCartItems = cart3.map((item) => ({
      name: item.name,
      cartQuantity: item.cartQuantity,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      cartItems: updatedCartItems,
    }));
  }, [cart3]);

  // xóa 1 sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  // giảm số lượng sản phẩm
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
    const updatedCartItems = cart3.map((item) => ({
      name: item.name,
      cartQuantity: item.cartQuantity,
    }));
    setFormData({
      ...formData,
      cartItems: updatedCartItems,
    });
    // window.location.reload();
  };
  // tăng số lượng sản phẩm
  const handleAddToCart = (product) => {
    dispatch(addTocart(product));
    const updatedCartItems = cart3.map((item) => ({
      name: item.name,
      cartQuantity: item.cartQuantity,
    }));
    setFormData({
      ...formData,
      cartItems: updatedCartItems,
    });
    // window.location.reload();
  };
  // xóa tất cả giỏ hàng
  const handleClearCart = () => {
    dispatch(clearCart());
    // window.location.reload();
  };

  // gửi về admin
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    let hasError = false;
    let errorMessage = "";
  
    if (!formData.fullname.trim()) {
      errorMessage = "Tên khách hàng không được để trống.";
      hasError = true;
    } else if (!formData.phone.trim()) {
      errorMessage = "Số điện thoại không được để trống.";
      hasError = true;
    } else if (!formData.address.trim()) {
      errorMessage = "Địa chỉ không được để trống.";
      hasError = true;
    }
  
    const phonePattern = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      errorMessage = "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.";
      hasError = true;
    }
  
    if (hasError) {
      alert(errorMessage);
      return;
    }
  
    try {
      for (const item of cart3) {
        const productId = item.id;
        const quantityPurchased = item.cartQuantity;
  
        await axios.patch(
          `http://localhost:7000/product/update-inventory/${productId}`,
          {
            quantity: quantityPurchased,
          }
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Số lượng sản phẩm trong giỏ hàng vượt quá số lượng tồn kho.");
        hasError = true;
        window.location.reload();
      } else {
        alert("Có lỗi xảy ra khi cập nhật số lượng tồn kho.");
        hasError = true;
        window.location.reload();
      }
    }
  
    if (!hasError) {
      const url = "http://localhost:7000/customer";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert("Bạn đã mua hàng thành công. Đơn hàng sẽ được giao trong 3-4 ngày tới. Xin cảm ơn.");
        })
        .catch((error) => {
          alert("Lỗi ", error);
          console.error("Error:", error);
        });
  
      setShowForm(false);
      dispatch(clearCart());
    }
  };
  

  const handleClick = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems && cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Giỏ hàng của bạn hiện đang trống</p>
          <div className="start-shopping">
            <Link to="/product">Quay lại trang sản phẩm</Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Tên</h3>
            <h3 className="price">Giá</h3>
            <h3 className="quantity">Số lượng</h3>
            <h3 className="total">Tổng tiền</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={`${API_URL}${cartItem.imageUrl}`} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>Xóa</button>
                  </div>
                </div>
                <div className="cart-product-price">{numeral(cartItem.price).format("0,0")}đ</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  {numeral(cartItem.price * cartItem.cartQuantity).format("0,0")}đ
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>Xóa Giỏ Hàng</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Tổng tiền</span>
                <span className="amount">{numeral(cart.cartTotalAmount).format("0,0")}đ</span>
              </div>
              <button onClick={handleClick}>Thanh toán</button>
            </div>
          </div>
        </div>
      )}

      {/* Form thanh toán */}
      {showForm && (
        <>
          <div className="overlay" onClick={handleBack}></div>
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              <div style={{ textAlign: "center" , fontWeight: "bold", fontSize: "20px", marginBottom: "20px"}}>PHIẾU THANH TOÁN</div>
              <div className="input-container">
                <input type="text" placeholder="Tên khách hàng" name="fullname" value={formData.fullname} onChange={handleChange} />
              </div>
              <div className="input-container">
                <input type="text" placeholder="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="input-container">
                <input type="text" placeholder="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <button className="back-button" onClick={handleBack}>Quay lại</button>
                <button className="back-button">Mua hàng</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
