import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTimeLimit } from "@redux/actions/gameSettingsActions";
import "./GameSettingsTime.scss";

const GameSettingsTime = () => {
  const dispatch = useDispatch();
  const { timeLimit } = useSelector((state) => state.gameSettings);
  const [showTooltip, setShowTooltip] = useState(false);
  const [noLimitSelected, setNoLimitSelected] = useState(false);

  const handleTimeLimitChange = useCallback(
    (e) => {
      dispatch(setTimeLimit(Number(e.target.value)));
      setNoLimitSelected(false);
    },
    [dispatch]
  );

  const handleNoLimitClick = useCallback(() => {
    dispatch(setTimeLimit(0));
    setNoLimitSelected(true);
  }, [dispatch]);

  return (
    <div className="time-limit">
      <label>
        Time Limit:
        <input
          type="range"
          min="10"
          max="240"
          step="10"
          value={timeLimit}
          onChange={handleTimeLimitChange}
          className="time-slider"
        />
        <span>{timeLimit === 0 ? "No Limit" : `${timeLimit} seconds`}</span>
      </label>
      <div className="no-limit-container">
        <button
          className={`no-limit-btn ${noLimitSelected ? "selected" : ""}`}
          onClick={handleNoLimitClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          No Limit
        </button>
        {showTooltip && (
          <div className="tooltip">
            After the opponent guesses the location, you have 15 seconds left.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(GameSettingsTime);
