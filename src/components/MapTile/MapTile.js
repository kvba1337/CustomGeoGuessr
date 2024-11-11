import React from "react";
import "./MapTile.scss";

const MapTile = ({ map, onPlayClick }) => {
  const imagePath = require(`../../assets/images/maps/${map.image}`);

  return (
    <div className="tile">
      <img src={imagePath} alt={map.title} className="tile__image" />
      <h1 className="tile__title">{map.title}</h1>
      <button className="tile__play-button" onClick={onPlayClick}>
        Play
      </button>
    </div>
  );
};

export default MapTile;
