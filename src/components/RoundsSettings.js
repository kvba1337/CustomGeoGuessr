import React, { memo } from "react";
import "../styles/components/RoundsSettings.scss";

const options = [1, 3, 5, 10];

const RoundsSettings = ({ totalRounds, setTotalRounds }) => {
  return (
    <div className="rounds">
      <h3>Number Of Rounds:</h3>
      <div className="rounds-options">
        {options.map((option) => (
          <label
            key={option}
            className={totalRounds === option ? "active" : ""}
          >
            <input
              type="radio"
              name="rounds"
              value={option}
              checked={totalRounds === option}
              onChange={() => setTotalRounds(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default memo(RoundsSettings);
