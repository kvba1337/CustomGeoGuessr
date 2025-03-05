import React from "react"
import "./HeaderUserMenu.scss"

const UserMenu = ({ avatar, username, handleLogout }) => (
  <div className="header__user">
    <div className="header__user-avatar-container">
      <img src={avatar} alt="User Avatar" className="header__user-avatar" />
    </div>
    <div className="header__user-menu-wrapper">
      <div className="header__user-menu">
        <img
          src={avatar}
          alt="User Avatar"
          className="header__user-avatar-large"
        />
        <p className="header__user-name">{username}</p>
        <button className="button button-danger" onClick={handleLogout}>
          <div className="button-wrapper">
            <span className="button-label">Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  </div>
)

export default React.memo(UserMenu)
