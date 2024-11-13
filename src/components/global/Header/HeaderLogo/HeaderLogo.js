import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/images/icons/logo.webp";
import "./HeaderLogo.scss";

const Logo = () => (
  <div className="header__logo-container">
    <Link to="/" className="header__logo">
      <img
        src={logo}
        alt="GeoGuessr Clone Logo"
        className="header__logo-image"
      />
      <span className="header__title">CustomGeoGuessr</span>
    </Link>
  </div>
);

export default React.memo(Logo);
