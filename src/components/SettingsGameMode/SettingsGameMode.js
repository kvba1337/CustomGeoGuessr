import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameMode } from "../../redux/actions/gameSettingsActions";
import "./SettingsGameMode.scss";

const SettingsGameMode = () => {
  const dispatch = useDispatch();
  const { gameMode } = useSelector((state) => state.gameSettings);

  const handleGameModeChange = (mode) => {
    dispatch(setGameMode(mode));
  };

  return (
    <div className="game-mode">
      <h3>Game Mode:</h3>
      {["Move", "NoMove", "NMPZ"].map((mode) => (
        <label
          key={mode}
          className={gameMode === mode ? "active" : ""}
          onClick={() => handleGameModeChange(mode)}
        >
          {mode}
          <input type="radio" name="gameMode" value={mode} />
        </label>
      ))}
    </div>
  );
};

export default SettingsGameMode;
