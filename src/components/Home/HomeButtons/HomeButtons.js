import React from "react";
import { Link } from "react-router-dom";
import "./HomeButtons.scss";

const HomeButtons = () => (
  <div className="home__buttons">
    <Link to="/select-map" className="home__button disabled">
      Singleplayer
    </Link>
    <Link to="/multiplayer" className="home__button">
      Multiplayer
    </Link>
  </div>
);

export default HomeButtons;
