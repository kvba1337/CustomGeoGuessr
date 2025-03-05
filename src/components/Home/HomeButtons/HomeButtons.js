import React from "react"
import { Link } from "react-router-dom"
import "./HomeButtons.scss"

const HomeButtons = () => (
  <div className="home__buttons">
    <Link
      to="/select-map"
      className="button button-purple button-lg button-disabled"
      disabled={true}
    >
      <div className="button-wrapper">
        <span className="button-label">Singleplayer</span>
      </div>
    </Link>
    <Link to="/multiplayer" className="button button-purple button-lg">
      <div className="button-wrapper">
        <span className="button-label">Multiplayer</span>
      </div>
    </Link>
  </div>
)

export default HomeButtons
