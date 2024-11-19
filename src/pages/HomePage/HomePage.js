import React from "react";
import { useSelector } from "react-redux";

import Header from "@components/global/Header/Header/Header";
import AuthModal from "@components/Home/Auth/AuthModal/AuthModal";
import HomeHero from "@components/Home/HomeHero/HomeHero";
import "./HomePage.scss";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        {isAuthenticated ? <HomeHero /> : <AuthModal />}
      </div>
    </div>
  );
};

export default HomePage;
