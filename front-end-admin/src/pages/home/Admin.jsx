import React, { ReactNode, useState } from "react";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import "./header.css";
import {
  TeamOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import ListSp from "../category/Category";
import Products from "../product/Product";
import Customer from "../customer/Customer";

const { Header, Content, Footer, Sider } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className={"header"}>
        <div>TRANG QUẢN LÝ</div>
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <div>
            <Link to="/category">
              <div className={"page"}>
                {" "}
                <MenuUnfoldOutlined />
                Danh Mục
              </div>
            </Link>
            <Link to="/customer">
              <div className={"page"}>
                {" "}
                <TeamOutlined />
                Khách Hàng
              </div>
            </Link>
            <Link to="/product">
              <div className={"page"}>
                {" "}
                <TeamOutlined />
                Sản phẩm
              </div>
            </Link>
          </div>
        </Sider>
        <Layout>
          <Header style={{ height: 0, background: "#777676" }} />
          <Content style={{ margin: "20px 50px 0 0px" }}>
            <div style={{ background: "#f9f8f8" }}>
              {/* <Outlet /> */}
              <Routes>
                <Route path="/category" element={<ListSp />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/product" element={<Products />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {" "}
            Design ©2023 Created by Coppy
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
