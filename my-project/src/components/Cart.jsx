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
  const dispatch = useDispatch();
  //khai báo biến form
  
  const [showForm, setShowForm] = useState(false);
  const  [formData, setFormData] = useState({
    fullname:"",
    phone: "",
    address: "",
    cartItems: cart,
    tongtien:0,
    tongsoluong:0,
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
  
  // xóa 1 sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  // giảm số lượng sản phẩm
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
    window.location.reload();
  };
  // tăng số lượng sản phẩm
  const handleAddToCart = (product) => {
    dispatch(addTocart(product));
    window.location.reload();
  };
  // xóa tất cả giỏ hàng
  const handleClearCart = () => {
    dispatch(clearCart());
    window.location.reload();
  };
 
  // gửi về admin
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value

    });
  };

  const handleFormSubmit =  (e) => {
    e.preventDefault();
    console.log(formData.tongsoluong);
    // Xử lý dữ liệu khi người dùng gửi form
    const url = 'http://localhost:7000/customer';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Xử lý kết quả từ server (nếu cần)
        console.log(formData)
        alert("Bạn đã mua hàng thành công.Đơn hàng sẽ được giao trong vào 3-4 ngày tới.Xin cảm ơn")
        
      })
      .catch(error => {
        // Xử lý lỗi (nếu có)
        alert("Lỗi ",error)
        console.error('Error:', error);
      });

      setShowForm(false); 
      dispatch(clearCart());     
  };

  const handleClick = () => {
    setShowForm(true);
    console.log(formData)
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems && cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Giỏ hàng của bạn hiện đang trống</p>
          <div className="start-shopping">
            <Link to="/product">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Quay lại trang sản phẩm</span>
            </Link>
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
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img
                      src={`${API_URL}${cartItem.imageUrl}`}
                      alt={cartItem.name}
                    />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">
                    {numeral(cartItem.price).format("0,0")}đ
                  </div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {numeral(cartItem.price * cartItem.cartQuantity).format(
                      "0,0"
                    )}
                    đ
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Xóa Giỏ Hàng
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Tổng tiền</span>
                <span className="amount">
                  {numeral(cart.cartTotalAmount).format("0,0")}đ
                </span>
              </div>
              <p>
                Sản phẩm sẽ được thanh toán sau khi vận chuyển đến khách hàng
              </p>
              <button onClick={handleClick}>Thanh toán</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Tiếp tục mua hàng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {showForm && (
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="subtitle">NHẬP THÔNG TIN KHÁCH HÀNG!</div>
            <div className="input-container ic1">
              <input
                id="name"
                className="input"
                type="text"
                placeholder=" "
                value={formData.fullname}
                name="fullname"
                onChange={handleChange}
              />
              <div className="cut"></div>
              <label  htmlFor="name" className="placeholder">
                Tên khách hàng
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="phone"
                className="input"
                type="text"
                placeholder=" "
                value={formData.phone}
                name="phone"
                onChange={handleChange}
              />
              <div className="cut"></div>
              <label  htmlFor="phone" className="placeholder">
                Số điện thoại
              </label>
            </div>
            <div className="input-container ic2">
              <input
                id="address"
                className="input"
                type="text"
                placeholder=" "
                value={formData.address}
                name="address"
                onChange={handleChange}
              />
              <div className="cut cut-short"></div>
              <label  htmlFor="address"  className="placeholder">
                Địa chỉ
              </label>
            </div>
            <button type="text" className="submit" >
              Mua hàng
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
