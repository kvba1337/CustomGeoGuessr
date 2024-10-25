import React from "react";
import MapTile from "../MapTile/MapTile";
import "./MapSelectionGrid.scss";

const MapSelectionGrid = ({ maps, onPlay }) => {
  return (
    <div className="map-selection__content">
      <div className="map-selection-grid">
        {maps.map((map) => (
          <MapTile key={map.id} map={map} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
};

export default MapSelectionGrid;