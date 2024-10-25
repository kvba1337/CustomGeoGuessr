import React, { memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./GameResultMap.scss";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomPolyline from "../CustomPolyline/CustomPolyline";
import avatar1 from "../../assets/images/avatars/avatar1.png";
import correctLocation from "../../assets/images/icons/correct-location.png";
import useResultMapAutoBounds from "../../hooks/useResultMapAutoBounds";

const GameResultMap = ({ userAllGuessedLocations, gameLocations }) => {
  const { onLoadMap, renderedIndexes } = useResultMapAutoBounds(
    gameLocations,
    userAllGuessedLocations
  );

  return (
    <div className="result-map">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={onLoadMap}
        options={{
          disableDefaultUI: true,
          minZoom: 2,
        }}
      >
        {renderedIndexes.map((index) => (
          <React.Fragment
            key={`fragment-${index}-${gameLocations[index].lat}-${gameLocations[index].lng}`}
          >
            <CustomMarker
              location={gameLocations[index]}
              icon={correctLocation}
            />
            {userAllGuessedLocations[index] && (
              <>
                <CustomMarker
                  location={userAllGuessedLocations[index]}
                  icon={avatar1}
                />
                <CustomPolyline
                  location={gameLocations[index]}
                  location2={userAllGuessedLocations[index]}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default memo(GameResultMap);
