import React, { memo } from "react";
import MiniMapControlButton from "../MiniMapControlButton/MiniMapControlButton";
import "./MiniMapControlButtons.scss";

const MiniMapControlButtons = ({
  enlargeMap,
  shrinkMap,
  isEnlargeDisabled,
  isShrinkDisabled,
}) => {
  return (
    <div className="map-buttons">
      <MiniMapControlButton
        onClick={enlargeMap}
        isDisabled={isEnlargeDisabled}
        iconClass="fa-solid fa-arrow-up"
        btnClass="enlarge-btn"
      />
      <MiniMapControlButton
        onClick={shrinkMap}
        isDisabled={isShrinkDisabled}
        iconClass="fa-solid fa-arrow-down"
        btnClass="shrink-btn"
      />
    </div>
  );
};

export default memo(MiniMapControlButtons);
