import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeLimit } from "@redux/actions/gameSettingsActions";
import "./GameSettingsTime.scss";

const GameSettingsTime = () => {
  const dispatch = useDispatch();
  const { timeLimit } = useSelector((state) => state.gameSettings);
  const sliderRef = useRef(null);

  const handleTimeLimitChange = useCallback(
    (e) => {
      const value = Number(e.target.value);
      const percentage = ((value - 10) / (240 - 10)) * 100;
      e.target.style.setProperty("--slider-value", `${percentage}%`);
      dispatch(setTimeLimit(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((timeLimit - 10) / (240 - 10)) * 100;
      sliderRef.current.style.setProperty("--slider-value", `${percentage}%`);
    }
  }, [timeLimit]);

  return (
    <div className="time-limit">
      <div className="time-limit__label">
        <label>
          <h3>Time Limit: </h3>
          <input
            type="range"
            min="10"
            max="240"
            step="10"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            className="time-slider"
            ref={sliderRef}
          />
          <p>{timeLimit === 0 ? "No Limit" : `${timeLimit} seconds`}</p>
        </label>
      </div>
    </div>
  );
};

export default React.memo(GameSettingsTime);
