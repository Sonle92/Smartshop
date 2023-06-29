import React from 'react'
import '../App.css'
import logo from '../image/Mylogo.png'
import {BsFacebook,BsYoutube} from 'react-icons/bs'
import {SiZalo} from 'react-icons/si'


export default function Footer() {
  return (
    <div className="footer" >
      <div><img src={logo} alt='' width={130} height={130}></img></div>
      <div className="footer_item">
        <div className="contents"><u>THÔNG TIN</u>
          <div className="content">
            <div>Tin tức</div>
            <div>Giới thiệu</div>
            <div>Thanh toán</div>
          </div>
        </div>
        <div className="contents"><u>Chính sách</u>
          <div className="content">
            <div>Bảo hành</div>
            <div>Sửa chửa</div>
            <div>Giao hàng</div>
          </div>
        </div>
        <div className="contents"><u>Địa chỉ liên hệ</u>
          <div className="content">
            <div>Đơn đặt hàng</div>
            <div>Hệ thống</div>
            <span className="icon1"><BsFacebook/></span>
            <span className="icon2"><BsYoutube/></span>
            <span className="icon3"><SiZalo/></span>
          </div>
        </div>
      </div>
    </div>
  )
}