// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/userLogin" className="nav-link">
            FarmerLogin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/userRegistration" className="nav-link">
            Farmer Registration
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dealerLogin" className="nav-link">
            Dealer Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dealerRegistration" className="nav-link">
            Dealer Registration
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
