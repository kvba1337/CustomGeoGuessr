import React from "react"
import "./HomeWelcomeContent.scss"

const HomeWelcomeContent = ({ onPlayClick }) => (
  <div className="home-welcome">
    <h1 className="home-welcome__title">Explore the world!</h1>
    <h2 className="home-welcome__subtitle">
      Challenge yourself in every environment - dense jungles, vast deserts, or
      iconic landmarks.
    </h2>
    <button className="button button-primary button-lg " onClick={onPlayClick}>
      <div className="button-wrapper animation-scaleIn">
        <span className="button-label">Play Now</span>
      </div>
    </button>
    <div className="home-welcome__features">
      <div className="feature">
        <i className="fas fa-globe-americas animation-scaleIn"></i>
        <span>200+ Countries</span>
      </div>
      <div className="feature">
        <i className="fas fa-users animation-scaleIn"></i>
        <span>Multiplayer</span>
      </div>
      <div className="feature">
        <i className="fas fa-gamepad animation-scaleIn"></i>
        <span>Various Modes</span>
      </div>
    </div>
  </div>
)

export default HomeWelcomeContent
