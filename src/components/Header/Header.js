import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import Cookies from "js-cookie";
import logo from "../../assets/images/icons/logo.webp";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idToken = Cookies.get("idToken");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { username, avatar } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
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
      {idToken && (
        <div
          className="header__user"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <img src={avatar} alt="User Avatar" className="header__user-avatar" />
          {showUserMenu && (
            <div className="header__user-menu">
              <img
                src={avatar}
                alt="User Avatar"
                className="header__user-avatar-large"
              />
              <p className="header__user-name">{username}</p>
              <button className="header__logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
