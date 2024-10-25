import React, { memo } from "react";
import "./SettingsGameMode.scss";

const modes = ["move", "noMove", "NMPZ"];

const SettingsGameMode = ({ gameMode, setGameMode }) => {
  return (
    <div className="game-mode">
      <h3>Game Mode:</h3>
      {modes.map((mode) => (
        <label
          key={mode}
          className={`game-mode-option ${gameMode === mode ? "active" : ""}`}
        >
          <input
            type="radio"
            value={mode}
            checked={gameMode === mode}
            onChange={(e) => setGameMode(e.target.value)}
            className="visually-hidden"
          />
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default memo(SettingsGameMode);
