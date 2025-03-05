import React from "react"
import "./AuthSelectedAvatar.scss"

const AuthSelectedAvatar = ({ selectedAvatar }) => (
  <div className="selected-avatar">
    <img src={selectedAvatar} alt="Selected Avatar" />
  </div>
)

export default React.memo(AuthSelectedAvatar)
