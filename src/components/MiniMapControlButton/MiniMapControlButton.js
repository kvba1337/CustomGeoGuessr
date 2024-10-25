import React from "react";
import "./MiniMapControlButton.scss";

const MiniMapControlButton = ({ onClick, isDisabled, iconClass, btnClass }) => {
  return (
    <button
      className={`map-btn ${btnClass} ${isDisabled ? "disabled" : ""}`}
      onClick={isDisabled ? null : onClick}
    >
      <i className={iconClass}></i>
    </button>
  );
};

export default MiniMapControlButton;
