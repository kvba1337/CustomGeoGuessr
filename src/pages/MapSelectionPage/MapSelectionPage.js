import Header from "@components/global/Header/Header/Header"
import MapSelectionGrid from "@components/MapSelection/MapSelectionGrid/MapSelectionGrid"
import React from "react"
import "./MapSelectionPage.scss"

const MapSelectionPage = () => {
  return (
    <div className="map-selection-container">
      <Header />
      <div className="map-selection">
        <MapSelectionGrid />
      </div>
    </div>
  )
}

export default MapSelectionPage
