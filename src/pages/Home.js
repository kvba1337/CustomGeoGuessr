import React, { memo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/pages/Home.scss";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <div className="home__content">
          <h1>Explore the World!</h1>
          <div className="home__buttons">
            <Link to="/singleplayer" className="home__button">
              Singleplayer
            </Link>
            <Link to="/" className="home__button">
              Multiplayer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
