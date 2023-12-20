import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import UserHeader from "./components/Header/UserHeader";
import AdminHeader from "./components/Header/AdminHeader";
import UserLogin from "./components/Auth/UserLogin";
import Complaints from "./components/FarmerDashboard/Complaints";
import ComplaintsAdmin from "./components/DealerDashboard/ComplaintsAdmin/ComplaintsAdmin";
import UserRegister from "./components/Auth/UserRegister";
import DealerLogin from "./components/Auth/DealerLogin";
import DealerRegister from "./components/Auth/DealerRegister";
import Products from "./components/FarmerDashboard/Products/Products";
import Cart from "./components/FarmerDashboard/Cart/Cart";
import Thanks from "./components/FarmerDashboard/Thanks/Thanks";
import Orders from "./components/FarmerDashboard/Orders/Orders";
import AddProduct from "./components/DealerDashboard/AddProduct/AddProduct";
import ProductAdmin from "./components/DealerDashboard/ProductAdmin/AllProducts";
import Landing from "./Landing";
export const config = {
  endpoint: `http://localhost:8083/api/v1`,
  imageUrl: `http://localhost:8083`,
};

const App = () => {
  // Fetch user type from localStorage
  const userType = localStorage.getItem("userType");

  return (
    <div className={!userType?"background":""}>
      <Router>
        {!userType ? (
          <Header />
        ) : userType === "user" ? (
          <UserHeader />
        ) : (
          <AdminHeader />
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userRegistration" element={<UserRegister />} />
          <Route path="/dealerLogin" element={<DealerLogin />} />
          <Route path="/dealerRegistration" element={<DealerRegister />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/complaintsAdmin" element={<ComplaintsAdmin />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/productsAdmin" element={<ProductAdmin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
