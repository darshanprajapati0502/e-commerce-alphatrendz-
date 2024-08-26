import React, { useState } from "react";
import "./Navbar.css";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export const Navbar = () => {
   
  const [menu, setMenu] = useState("Shop");
  /*====>this is applied for menu selection*/

  return (
    <div className="navbar">
      <div>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>AlphaTrendz</p>
        </div>
        <p>{localStorage.getItem("SignIn")}</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Shop");
          }}
        >
          <Link className="xyz" to="/">
            Shop{menu === "Shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("Shirts");
          }}
        >
          <Link className="xyz" to="/Shirt">
            Shirts{menu === "Shirts" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("Jeans");
          }}
        >
          <Link className="xyz" to="/Jeans">
            Jeans{menu === "Jeans" ? <hr /> : <></>}
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("T-shirt");
          }}
        >
          <Link className="xyz" to="/T-shirt">
            T-Shirts {menu === "T-shirt" ? <hr /> : <></>}
          </Link>
        </li>
         <li
          onClick={() => {
            setMenu("AddProduct");
          }}
        >
          <Link className="xyz" to="/AddProduct">
            AddProduct {menu === "AddProduct" ? <hr /> : <></>}
          </Link>
        </li> 
      </ul>

      <div className="nav-login-cart gap-10">
        <Link className="xyz" to="/login">
          <button className="border-2 border-blue-500 text-blue-500 w-9 flex items-center px-5 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
            <LuLogIn className="h-7 w-6 mr-2" />
            Login
          </button>
        </Link>
      </div>

      <div className="flex py-5">
        <Link className="xyz" to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};
export default Navbar;
