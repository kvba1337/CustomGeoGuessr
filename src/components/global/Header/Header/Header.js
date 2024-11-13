import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { logoutCurrentUser } from "@redux/actions/userActions";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import HeaderUserMenu from "../HeaderUserMenu/HeaderUserMenu";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const idToken = Cookies.get("idToken");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { username, avatar } = useSelector((state) => state.user);

  const handleLogout = useCallback(() => {
    dispatch(logoutCurrentUser());
  }, [dispatch]);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  return (
    <header className="header">
      <HeaderLogo />
      {idToken && (
        <HeaderUserMenu
          avatar={avatar}
          username={username}
          showUserMenu={showUserMenu}
          toggleUserMenu={toggleUserMenu}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default React.memo(Header);
