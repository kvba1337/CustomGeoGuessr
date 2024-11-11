import React from "react";
import Header from "../../components/Header/Header";
import MapSelectionGrid from "../../components/MapSelectionGrid/MapSelectionGrid";
import "./MapSelection.scss";


const MapSelection = () => {
  return (
    <>
      <Header />
      <div className="map-selection">
        <MapSelectionGrid />
      </div>
    </>
  );
};

export default MapSelection;
