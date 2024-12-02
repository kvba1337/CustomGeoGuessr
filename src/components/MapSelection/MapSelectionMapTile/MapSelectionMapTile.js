import React from "react";
import "./MapSelectionMapTile.scss";

const MapSelectionMapTile = ({ map, onPlayClick }) => {
  const imagePath = require(`@assets/images/maps/${map.image}`);

  return (
    <div className="tile">
      <img src={imagePath} alt={map.title} className="tile__image" />
      <h1 className="tile__title">{map.title}</h1>
      <button
        className="button button-secondary button-sm-wide"
        onClick={onPlayClick}
      >
        <div className="button-wrapper">
          <span className="button-label">Play</span>
        </div>
      </button>
    </div>
  );
};

export default React.memo(MapSelectionMapTile);
