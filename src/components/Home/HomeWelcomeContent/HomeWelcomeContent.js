import React from "react";
import "./HomeWelcomeContent.scss";

const HomeWelcomeContent = ({ onPlayClick }) => (
  <div className="home-welcome">
    <h1 className="home-welcome__title">Explore the world!</h1>
    <h2 className="home-welcome__subtitle">
      Challenge yourself in every environment - dense jungles, vast deserts, or
      iconic landmarks.
    </h2>
    <button className="button button-primary button-lg" onClick={onPlayClick}>
      Play Now
    </button>
    <div className="home-welcome__features">
      <div className="feature">
        <i className="fas fa-globe-americas"></i>
        <span>200+ Countries</span>
      </div>
      <div className="feature">
        <i className="fas fa-users"></i>
        <span>Multiplayer</span>
      </div>
      <div className="feature">
        <i className="fas fa-gamepad"></i>
        <span>Various Modes</span>
      </div>
    </div>
  </div>
);

export default HomeWelcomeContent;
