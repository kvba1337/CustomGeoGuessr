import React from "react";
import HomeButtons from "@components/Home/HomeButtons/HomeButtons";
import "./HomeHero.scss";

const HomeHero = () => (
  <div className="home__hero">
    <div className="home__hero-content">
      <h1>Explore the World!</h1>
      <HomeButtons />
    </div>
  </div>
);

export default HomeHero;
