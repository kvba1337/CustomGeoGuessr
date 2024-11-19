import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameType } from "@redux/actions/gameSettingsActions";
import "./GameSettingsMode.scss";

const GameSettingsMode = () => {
  const dispatch = useDispatch();
  const { gameType } = useSelector((state) => state.gameSettings);

  const handleGameTypeChange = (type) => {
    dispatch(setGameType(type));
  };

  return (
    <div className="game-type">
      <h2>Select Game Type</h2>
      <div className="game-type__options">
        <div
          className={`game-type__option ${
            gameType === "classic" ? "active" : ""
          }`}
          onClick={() => handleGameTypeChange("classic")}
        >
          <h3>Classic Mode</h3>
          <p>Play with predefined number of rounds and time limit</p>
          <ul>
            <li>Choose number of rounds</li>
            <li>Set time limit per round</li>
            <li>Select movement restrictions</li>
          </ul>
        </div>
        <div
          className={`game-type__option ${
            gameType === "battle" ? "active" : ""
          }`}
          onClick={() => handleGameTypeChange("battle")}
        >
          <h3>Battle Mode</h3>
          <p>Fight until one player runs out of health points</p>
          <ul>
            <li>Start with 6000 HP</li>
            <li>Damage based on distance difference</li>
            <li>15s timer after first guess</li>
            <li>Select movement restrictions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameSettingsMode;
