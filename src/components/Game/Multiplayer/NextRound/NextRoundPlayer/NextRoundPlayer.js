import React from "react"
import "./NextRoundPlayer.scss"

const Player = ({ avatar, username }) => (
  <div className="player">
    <img src={avatar} alt="Player" className="avatar" />
    <p>{username.toUpperCase()}</p>
  </div>
)

export default React.memo(Player)
