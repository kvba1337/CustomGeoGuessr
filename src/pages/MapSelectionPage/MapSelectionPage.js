import React from "react";

import Header from "@components/global/Header/Header/Header";
import MapSelectionGrid from "@components/MapSelection/MapSelectionGrid/MapSelectionGrid";
import "./MapSelectionPage.scss";

const MapSelectionPage = () => {
  return (
    <>
      <Header />
      <div className="map-selection">
        <MapSelectionGrid />
      </div>
    </>
  );
};

export default MapSelectionPage;
