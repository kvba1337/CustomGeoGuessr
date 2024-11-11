import React from "react";
import MiniMapControlButton from "../MiniMapControlButton/MiniMapControlButton";
import "./MiniMapControlButtons.scss";

const MiniMapControlButtons = ({ onZoomIn, onZoomOut, isMaxSize, isMinSize }) => {
  return (
    <div className="map-buttons">
      <MiniMapControlButton onClick={onZoomIn} icon="fa-arrow-up" disabled={isMaxSize} />
      <MiniMapControlButton onClick={onZoomOut} icon="fa-arrow-down" disabled={isMinSize} />
    </div>
  );
};

export default MiniMapControlButtons;