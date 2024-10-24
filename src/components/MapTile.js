import React, { memo } from "react";
import "../styles/components/MapTile.scss";

const MapTile = ({ map, onPlay }) => {
  return (
    <div className="single-player__tile">
      <img src={map.image} alt={map.name} className="single-player__image" />
      <h1>{map.name}</h1>
      <button
        className="single-player__play-button"
        onClick={() => onPlay(map)}
      >
        Play
      </button>
    </div>
  );
};

export default memo(MapTile);
