import React from "react";
import "./HeaderUserMenu.scss";

const UserMenu = ({
  avatar,
  username,
  showUserMenu,
  toggleUserMenu,
  handleLogout,
}) => (
  <div className="header__user" onClick={toggleUserMenu}>
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
);

export default React.memo(UserMenu);
