import { logoutCurrentUser } from "@redux/actions/userActions"
import Cookies from "js-cookie"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderLogo from "../HeaderLogo/HeaderLogo"
import HeaderUserMenu from "../HeaderUserMenu/HeaderUserMenu"
import "./Header.scss"

const Header = () => {
  const dispatch = useDispatch()
  const idToken = Cookies.get("idToken")
  const { username, avatar } = useSelector((state) => state.user)

  const handleLogout = useCallback(() => {
    dispatch(logoutCurrentUser())
  }, [dispatch])

  return (
    <header className="header">
      <div className="header__content">
        <HeaderLogo />
        {idToken && (
          <HeaderUserMenu
            avatar={avatar}
            username={username}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </header>
  )
}

export default Header
