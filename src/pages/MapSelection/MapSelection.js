import React, { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MapSelectionGrid from "../../components/MapSelectionGrid/MapSelectionGrid";
import "./MapSelection.scss";

import map1 from "../../assets/images/maps/tricity.jpg";
import map2 from "../../assets/images/maps/poland.jpg";
import map3 from "../../assets/images/maps/capitals.jpg";
import map4 from "../../assets/images/maps/largest-cities.jpg";
import map5 from "../../assets/images/maps/world.jpg";
import map6 from "../../assets/images/maps/gdansk.jpg";
import map7 from "../../assets/images/maps/famous.jpg";
import map8 from "../../assets/images/maps/famous-movies.jpg";

const mapDetails = [
  { id: 1, name: "Tricity", image: map1, dataPath: "map1.json" },
  { id: 2, name: "Poland", image: map2, dataPath: "map2.json" },
  { id: 3, name: "Capitals", image: map3, dataPath: "map3.json" },
  { id: 4, name: "Largest Cities", image: map4, dataPath: "map4.json" },
  { id: 5, name: "World", image: map5, dataPath: "map5.json" },
  { id: 6, name: "Gdańsk", image: map6, dataPath: "map6.json" },
  { id: 7, name: "Famous Places", image: map7, dataPath: "map7.json" },
  { id: 8, name: "Famous Movies", image: map8, dataPath: "map8.json" },
];

const MapSelection = () => {
  const navigate = useNavigate();
  const [maps] = useState(mapDetails);

  const handlePlay = useCallback(
    async (map) => {
      const mapData = await import(`../../assets/data/${map.dataPath}`);
      navigate("/game-settings", {
        state: { selectedMap: { ...mapData.default } },
      });
    },
    [navigate]
  );

  return (
    <>
      <Header />
      <div className="map-selection">
        <MapSelectionGrid maps={maps} onPlay={handlePlay} />
      </div>
    </>
  );
};

export default memo(MapSelection);