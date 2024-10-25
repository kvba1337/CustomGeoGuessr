import { useState, useCallback, useRef } from "react";
import {
  MINI_MAP_MAX_WIDTH,
  MINI_MAP_MIN_WIDTH,
  MINI_MAP_WIDTH,
  MINI_MAP_HEIGHT,
} from "../constants/MiniMapSettings";

const useMiniMapLogic = () => {
  const [mapDimensions, setMapDimensions] = useState({
    width: MINI_MAP_WIDTH,
    height: MINI_MAP_HEIGHT,
  });
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isEnlargeDisabled, setIsEnlargeDisabled] = useState(false);
  const [isShrinkDisabled, setIsShrinkDisabled] = useState(false);

  const timeoutRef = useRef(null);

  const enlargeMap = useCallback(() => {
    setMapDimensions((prev) => {
      const newWidth = Math.min(prev.width + 200, MINI_MAP_MAX_WIDTH);
      setIsEnlargeDisabled(newWidth === MINI_MAP_MAX_WIDTH);
      setIsShrinkDisabled(false);
      return { width: newWidth, height: prev.height + 120 };
    });
  }, []);

  const shrinkMap = useCallback(() => {
    setMapDimensions((prev) => {
      const newWidth = Math.max(prev.width - 200, MINI_MAP_MIN_WIDTH);
      setIsShrinkDisabled(newWidth === MINI_MAP_MIN_WIDTH);
      setIsEnlargeDisabled(false);
      return { width: newWidth, height: prev.height - 120 };
    });
  }, []);

  const handleMouseHoverMap = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsMapExpanded(true);
  }, []);

  const handleMouseLeaveMap = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsMapExpanded(false);
    }, 1000);
  }, []);

  return {
    mapDimensions,
    isMapExpanded,
    isEnlargeDisabled,
    isShrinkDisabled,
    enlargeMap,
    shrinkMap,
    handleMouseHoverMap,
    handleMouseLeaveMap,
  };
};

export default useMiniMapLogic;
