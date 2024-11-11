import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapTile from "../MapTile/MapTile";
import { setSelectedMap, fetchMap } from "../../redux/actions/mapActions";
import "./MapSelectionGrid.scss";

const MapSelectionGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useSelector((state) => state.room);

  const handlePlayClick = async (mapId) => {
    await dispatch(fetchMap(mapId));
    dispatch(setSelectedMap(mapId, roomId));
    navigate("/game-settings");
  };

  const maps = [
    { id: 1, title: "Tricity", image: "map1.jpg" },
    { id: 2, title: "Poland", image: "map2.jpg" },
    { id: 3, title: "Capitals", image: "map3.jpg" },
    { id: 4, title: "Largest Cities", image: "map4.jpg" },
    { id: 5, title: "World", image: "map5.jpg" },
    { id: 6, title: "Gdańsk", image: "map6.jpg" },
    { id: 7, title: "Famous Places", image: "map7.jpg" },
    { id: 8, title: "Famous Movies", image: "map8.jpg" },
  ];

  return (
    <div className="map-selection__content">
      <div className="map-selection-grid">
        {maps.map((map) => (
          <MapTile
            key={map.id}
            map={map}
            onPlayClick={() => handlePlayClick(map.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MapSelectionGrid;
