import React, { memo } from "react";
import "./MapTile.scss";

const MapTile = ({ map, onPlay }) => {
  return (
    <div className="tile">
      <img src={map.image} alt={map.name} className="tile__image" />
      <h1>{map.name}</h1>
      <button className="tile__play-button" onClick={() => onPlay(map)}>
        Play
      </button>
    </div>
  );
};

export default memo(MapTile);
