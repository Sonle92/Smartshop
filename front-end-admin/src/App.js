import './App.css';
import Admin from './pages/home/Admin';
import  Category  from './pages/category/Category';
import Products from './pages/product/Product';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Customer from './pages/customer/Customer';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Admin/>}>
        <Route path="category" element={<Category/>}/>
        <Route path="product" element={<Products/>}/>
        <Route path="customer" element={<Customer/>}/>
       </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
