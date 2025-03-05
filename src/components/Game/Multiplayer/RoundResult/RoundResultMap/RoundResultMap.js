import correctLocation from "@assets/images/icons/correct-location.png"
import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker"
import CustomPolyline from "@components/Game/Common/CustomPolyline/CustomPolyline"
import { GoogleMap } from "@react-google-maps/api"
import { extendMapBounds, getMapOptions } from "@utils/mapUtils"
import React, { useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import "./RoundResultMap.scss"

const RoundResultMap = () => {
  const { gameLocations, currentRound, roundResults, selectedMap } =
    useSelector((state) => state.game)
  const { avatar } = useSelector((state) => state.user)
  const { opponent } = useSelector((state) => state.room)

  const { userResult, opponentResult } = roundResults
  const currentLocation = gameLocations[currentRound - 1]
  const mapRef = useRef(null)

  const fitBounds = useCallback(() => {
    if (mapRef.current && currentLocation) {
      extendMapBounds(
        mapRef.current,
        [currentLocation],
        [userResult],
        [opponentResult],
        selectedMap
      )
    }
  }, [currentLocation, userResult, opponentResult, selectedMap])

  useEffect(() => {
    fitBounds()
  }, [fitBounds])

  const handleMapLoad = useCallback(
    (map) => {
      mapRef.current = map
      fitBounds()
    },
    [fitBounds]
  )

  return (
    <div className="round-result-map">
      <GoogleMap
        id="result-map"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={getMapOptions()}
        onLoad={handleMapLoad}
      >
        <CustomMarker location={currentLocation} icon={correctLocation} />
        {userResult?.guessedLocation && (
          <>
            <CustomMarker location={userResult.guessedLocation} icon={avatar} />
            <CustomPolyline
              location={userResult.guessedLocation}
              location2={currentLocation}
            />
          </>
        )}
        {opponentResult?.guessedLocation && (
          <>
            <CustomMarker
              location={opponentResult.guessedLocation}
              icon={opponent.avatar}
            />
            <CustomPolyline
              location={opponentResult.guessedLocation}
              location2={currentLocation}
            />
          </>
        )}
      </GoogleMap>
    </div>
  )
}

export default React.memo(RoundResultMap)
