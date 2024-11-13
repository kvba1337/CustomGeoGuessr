import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "@components/global/Header/Header/Header";
import AuthModal from "@components/Home/Auth/AuthModal/AuthModal";
import "./HomePage.scss";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <Header />
      <div className="home">
        {isAuthenticated ? (
          <div className="home__content">
            <h1>Explore the World!</h1>
            <div className="home__buttons">
              <Link to="/select-map" className="home__button disabled">
                Singleplayer
              </Link>
              <Link to="/multiplayer" className="home__button">
                Multiplayer
              </Link>
            </div>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </>
  );
};

export default HomePage;
