import { fetchMap, setSelectedMap } from "@redux/actions/mapActions"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MapSelectionMapTile from "../MapSelectionMapTile/MapSelectionMapTile"
import "./MapSelectionGrid.scss"

const MapSelectionGrid = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { roomId } = useSelector((state) => state.room)

  const handlePlayClick = useCallback(
    async (mapId) => {
      await dispatch(fetchMap(mapId))
      dispatch(setSelectedMap(mapId, roomId))
      navigate("/game-settings")
    },
    [dispatch, navigate, roomId]
  )

  const maps = [
    { id: 1, title: "Tricity", image: "map1.jpg" },
    { id: 2, title: "Poland", image: "map2.jpg" },
    { id: 3, title: "Capitals", image: "map3.jpg" },
    { id: 4, title: "Largest Cities", image: "map4.jpg" },
    { id: 5, title: "World", image: "map5.jpg" },
    { id: 6, title: "Gdańsk", image: "map6.jpg" },
    { id: 7, title: "Famous Places", image: "map7.jpg" },
    { id: 8, title: "Famous Movies", image: "map8.jpg" },
  ]

  return (
    <div className="map-selection__content">
      <div className="map-selection-grid">
        {maps.map((map) => (
          <MapSelectionMapTile
            key={map.id}
            map={map}
            onPlayClick={() => handlePlayClick(map.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(MapSelectionGrid)
