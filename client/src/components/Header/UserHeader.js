// Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      icon: "question",
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },

          willClose: () => {
            localStorage.setItem("is_authenticated", false);
            localStorage.removeItem("userType");
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            navigate("/userLogin");
            window.location.reload(false);
          },
        });
      }
    });
  };
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/complaints" className="nav-link">
            Complaints
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </li>
        <li className="nav-item" onClick={logout}>
          <Link to="#" className="nav-link" onClick={logout}>
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
