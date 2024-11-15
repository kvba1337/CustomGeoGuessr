import React from "react";
import { useSelector } from "react-redux";
import "./GameSettingsMapInfo.scss";

const GameSettingsMapInfo = () => {
  const { selectedMap } = useSelector((state) => state.map);

  return (
    <div className="map-info">
      <h1 className="map-title">{selectedMap?.title}</h1>
      <p className="map-description">{selectedMap?.description}</p>
    </div>
  );
};

export default React.memo(GameSettingsMapInfo);
