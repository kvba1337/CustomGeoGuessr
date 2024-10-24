import React, { memo } from "react";
import "../styles/components/MapButtons.scss";

const MapButton = ({ onClick, isDisabled, iconClass, btnClass }) => (
  <button
    className={`map-btn ${btnClass} ${isDisabled ? "disabled" : ""}`}
    onClick={isDisabled ? null : onClick}
  >
    <i className={iconClass}></i>
  </button>
);

const MapButtons = ({
  enlargeMap,
  shrinkMap,
  isEnlargeDisabled,
  isShrinkDisabled,
}) => {
  return (
    <div className="map-buttons">
      <MapButton
        onClick={enlargeMap}
        isDisabled={isEnlargeDisabled}
        iconClass="fa-solid fa-arrow-up"
        btnClass="enlarge-btn"
      />
      <MapButton
        onClick={shrinkMap}
        isDisabled={isShrinkDisabled}
        iconClass="fa-solid fa-arrow-down"
        btnClass="shrink-btn"
      />
    </div>
  );
};

export default memo(MapButtons);
