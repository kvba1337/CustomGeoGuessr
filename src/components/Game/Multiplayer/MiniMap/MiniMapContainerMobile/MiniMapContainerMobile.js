import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { setMarkerLocation } from "@redux/actions/gameActions"
import { database } from "@services/firebaseConfig"
import { ref, update } from "firebase/database"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./MiniMapContainerMobile.scss"

const libraries = ["places"]

const MiniMapContainerMobile = ({
  isMapVisible,
  setIsMapVisible,
  isSlidingDown,
  setIsSlidingDown,
}) => {
  const dispatch = useDispatch()
  const { selectedMap, markerLocation } = useSelector((state) => state.game)
  const { userId, avatar } = useSelector((state) => state.user)
  const { roomId } = useSelector((state) => state.room)
  const [isGuessMade, setIsGuessMade] = useState(false)
  const mapRef = useRef(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  useEffect(() => {
    if (mapRef.current && selectedMap) {
      mapRef.current.setCenter(selectedMap.defaultMapPosition)
      mapRef.current.setZoom(selectedMap.zoomLevel)
    }
  }, [selectedMap])

  const handleMapClick = useCallback(
    (event) => {
      if (!isGuessMade) {
        const { latLng } = event
        const lat = latLng.lat()
        const lng = latLng.lng()
        const location = { lat, lng }
        dispatch(setMarkerLocation(location))
      }
    },
    [isGuessMade, dispatch]
  )

  const handleGuessClick = useCallback(() => {
    if (markerLocation) {
      setIsGuessMade(true)
      update(ref(database, `rooms/${roomId}/users/${userId}`), {
        hasGuessed: true,
      })
    }
  }, [markerLocation, roomId, userId])

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map
      if (selectedMap) {
        map.setCenter(selectedMap.defaultMapPosition)
        map.setZoom(selectedMap.zoomLevel)
      }
    },
    [selectedMap]
  )

  const toggleMapVisibility = useCallback(() => {
    setIsMapVisible((prev) => !prev)
    if (isMapVisible) {
      setIsSlidingDown(true)
      setTimeout(() => {
        setIsSlidingDown(false)
      }, 500)
    }
  }, [isMapVisible, setIsMapVisible, setIsSlidingDown])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isMapVisible) {
        toggleMapVisibility()
      }
    },
    [isMapVisible, toggleMapVisibility]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    setIsMapVisible(false)
  }, [setIsMapVisible])

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <>
      {!isMapVisible && (
        <button
          className="button map-toggle-btn button-primary button-round"
          onClick={toggleMapVisibility}
        >
          <div className="button-wrapper">
            <span className="button-label">
              <i className="fa fa-map"></i>
            </span>
          </div>
        </button>
      )}
      {isMapVisible && (
        <div
          className={`mobile-map-container ${
            isSlidingDown ? "slide-down" : "slide-up"
          }`}
          role="dialog"
          aria-label="Map selection"
        >
          <button
            className="map-overlay-close"
            onClick={toggleMapVisibility}
            aria-label="Close map"
          >
            <span className="sr-only">Close map</span>
          </button>
          <div
            className="map-wrapper"
            role="region"
            aria-label="Interactive map"
          >
            <GoogleMap
              id="mobile-guess-map"
              onClick={handleMapClick}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                draggableCursor: isGuessMade ? "default" : "crosshair",
                clickableIcons: false,
                minZoom: 1,
              }}
              onLoad={handleMapLoad}
            >
              {markerLocation && (
                <CustomMarker location={markerLocation} icon={avatar} />
              )}
            </GoogleMap>
            <button
              className={`button mobile-guess-btn button-primary button-lg ${
                !markerLocation || isGuessMade ? "disabled" : ""
              }`}
              onClick={handleGuessClick}
              disabled={!markerLocation || isGuessMade}
            >
              <div className="button-wrapper">
                <span className="button-label">Guess</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(MiniMapContainerMobile)
