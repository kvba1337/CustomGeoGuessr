import React, { memo } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";
import logo from "../assets/images/icons/logo.webp";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img
          src={logo}
          alt="GeoGuessr Clone Logo"
          className="header__logo-image"
        />
        <span className="header__title">CustomGeoGuessr</span>
      </Link>
    </header>
  );
};

export default memo(Header);
