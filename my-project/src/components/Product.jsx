import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import numeral from "numeral";
import "../App.css";
import { API_URL } from "../constants/URLS";
import { useDispatch } from "react-redux";
import { addTocart } from "../features/cart";
import { useNavigate } from "react-router";
import SlideShow from "./SlideShow";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch("http://localhost:7000/category");
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }

    fetchCategory();
  }, [refresh]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:7000/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [refresh]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.categoryId === category);
  };
  const handelAddToCart = (product) => {
    dispatch(addTocart(product));
    navigate("/cart");
  };
  return (
    <div style={{ height: "max-content" }}>
      <div>
        <SlideShow />
      </div>
      <div className="list_category">
        {category.map((category) => (
          <div key={category._id}>
            <button
              className="button"
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="product_list">
          {getProductsByCategory(selectedCategory).map((product) => (
            <div key={product._id} className="ProductItem">
              <div>
                <img
                  src={`${API_URL}${product.imageUrl}`}
                  alt=""
                  width={200}
                  height={200}
                ></img>
              </div>
              <div>
                <div className="name">{product.name}</div>
                <div className="price">
                  {numeral(product.price).format("0,0")}đ
                </div>
                <button
                  className="buy"
                  onClick={() => handelAddToCart(product)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
