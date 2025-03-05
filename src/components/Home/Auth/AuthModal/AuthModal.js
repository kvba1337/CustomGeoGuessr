import React, { useCallback, useState } from "react"
import AuthGuestForm from "../AuthGuestForm/AuthGuestForm"
import AuthSignInForm from "../AuthSignInForm/AuthSignInForm"
import AuthSignUpForm from "../AuthSignUpForm/AuthSignUpForm"
import "./AuthModal.scss"

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("guest")

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "guest":
        return <AuthGuestForm />
      case "signIn":
        return <AuthSignInForm />
      case "signUp":
        return <AuthSignUpForm />
      default:
        return <AuthGuestForm />
    }
  }, [activeTab])

  return (
    <div className="auth-modal">
      <div className="auth-modal__container">
        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${
              activeTab === "guest" ? "active" : ""
            }`}
            onClick={() => setActiveTab("guest")}
          >
            Guest
          </button>
          <button
            className={`auth-modal__tab ${
              activeTab === "signIn" ? "active" : ""
            }`}
            onClick={() => setActiveTab("signIn")}
          >
            Sign In
          </button>
          <button
            className={`auth-modal__tab ${
              activeTab === "signUp" ? "active" : ""
            }`}
            onClick={() => setActiveTab("signUp")}
          >
            Sign Up
          </button>
        </div>
        <div className="auth-modal__content">{renderContent()}</div>
      </div>
    </div>
  )
}

export default React.memo(AuthModal)
