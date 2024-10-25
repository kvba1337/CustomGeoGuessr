import React, { useCallback, memo } from "react";
import "./SettingsTime.scss";

const SettingsTime = ({ timeLimit, setTimeLimit }) => {
  const handleChange = useCallback(
    ({ target: { value } }) => {
      setTimeLimit(value);
    },
    [setTimeLimit]
  );

  return (
    <label className="time-limit">
      Time Limit:
      <input
        type="range"
        min="10"
        max="240"
        step="10"
        value={timeLimit}
        onChange={handleChange}
        className="time-slider"
      />
      <span>{timeLimit} seconds</span>
    </label>
  );
};

export default memo(SettingsTime);
