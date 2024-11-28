import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "@components/global/Header/Header/Header";
import AuthModal from "@components/Home/Auth/AuthModal/AuthModal";
import HomeHero from "@components/Home/HomeHero/HomeHero";
import HomeWelcomeContent from "@components/Home/HomeWelcomeContent/HomeWelcomeContent";
import "./HomePage.scss";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [showAuth, setShowAuth] = useState(false);

  const handlePlayClick = () => {
    setShowAuth(true);
  };

  const renderContent = () => {
    if (isAuthenticated) {
      return <HomeHero />;
    }

    if (showAuth) {
      return <AuthModal />;
    }

    return <HomeWelcomeContent onPlayClick={handlePlayClick} />;
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">{renderContent()}</div>
    </div>
  );
};

export default HomePage;
