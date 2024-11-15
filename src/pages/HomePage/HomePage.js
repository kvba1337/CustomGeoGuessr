import React from "react";
import { useSelector } from "react-redux";

import Header from "@components/global/Header/Header/Header";
import AuthModal from "@components/Home/Auth/AuthModal/AuthModal";
import HomeContent from "@components/Home/HomeContent/HomeContent";
import "./HomePage.scss";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <Header />
      <div className="home">
        {isAuthenticated ? <HomeContent /> : <AuthModal />}
      </div>
    </>
  );
};

export default HomePage;
