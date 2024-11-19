import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTimeLimit } from "@redux/actions/gameSettingsActions";
import "./GameSettingsTime.scss";

const GameSettingsTime = () => {
  const dispatch = useDispatch();
  const { timeLimit } = useSelector((state) => state.gameSettings);

  const handleTimeLimitChange = useCallback(
    (e) => {
      dispatch(setTimeLimit(Number(e.target.value)));
    },
    [dispatch]
  );

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
          />
          <p>{timeLimit === 0 ? "No Limit" : `${timeLimit} seconds`}</p>
        </label>
      </div>
    </div>
  );
};

export default React.memo(GameSettingsTime);
