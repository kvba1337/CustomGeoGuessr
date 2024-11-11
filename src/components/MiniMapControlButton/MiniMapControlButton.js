import React from "react";
import "./MiniMapControlButton.scss";

const MiniMapControlButton = ({ onClick, icon, disabled }) => {
  return (
    <button className={`map-btn ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
      <i className={`fa ${icon}`}></i>
    </button>
  );
};

export default MiniMapControlButton;