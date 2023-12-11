import "./App.css";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import News from "./components/News";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Promotion from "./components/Promotion";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="news" element={<News />} />
          <Route path="promotion" element={<Promotion />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
