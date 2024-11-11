import React, { useState } from "react";
import GuestForm from "../GuestForm/GuestForm";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import "./AuthModal.scss";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("guest");

  const renderContent = () => {
    switch (activeTab) {
      case "guest":
        return <GuestForm />;
      case "signIn":
        return <SignInForm />;
      case "signUp":
        return <SignUpForm />;
      default:
        return <GuestForm />;
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__tabs">
        <button
          className={`auth-modal__tab ${activeTab === "guest" ? "active" : ""}`}
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
  );
};

export default AuthModal;
