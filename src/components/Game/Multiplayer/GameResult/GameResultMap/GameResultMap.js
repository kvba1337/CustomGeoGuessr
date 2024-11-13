import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap } from "@react-google-maps/api";

import CustomMarker from "@components/Game/Common/CustomMarker/CustomMarker";
import CustomPolyline from "@components/Game/Common/CustomPolyline/CustomPolyline";
import correctLocation from "@assets/images/icons/correct-location.png";
import { extendMapBounds, getMapOptions } from "@utils/mapUtils";
import "./GameResultMap.scss";

const GameResultMap = ({ userResults, opponentResults }) => {
  const { gameLocations, selectedMap } = useSelector((state) => state.game);
  const { avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      extendMapBounds(
        mapRef.current,
        gameLocations,
        userResults,
        opponentResults,
        selectedMap
      );
    }
  }, [gameLocations, userResults, opponentResults, selectedMap]);

  return (
    <div className="game-result-map">
      <GoogleMap
        id="result-map"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={getMapOptions()}
        onLoad={(map) => (mapRef.current = map)}
      >
        {gameLocations.map((location, index) => (
          <React.Fragment key={index}>
            <CustomMarker location={location} icon={correctLocation} />
            {userResults[index]?.guessedLocation && (
              <>
                <CustomMarker
                  location={userResults[index].guessedLocation}
                  icon={avatar}
                />
                <CustomPolyline
                  location={userResults[index].guessedLocation}
                  location2={location}
                />
              </>
            )}
            {opponentResults[index]?.guessedLocation && (
              <>
                <CustomMarker
                  location={opponentResults[index].guessedLocation}
                  icon={opponent.avatar}
                />
                <CustomPolyline
                  location={opponentResults[index].guessedLocation}
                  location2={location}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default React.memo(GameResultMap);
