import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/images/logo/logo.webp";
import "./HeaderLogo.scss";

const Logo = () => (
  <div className="header__logo-container">
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="header__logo-image animation-scaleIn"
      />
    </Link>
  </div>
);

export default React.memo(Logo);
