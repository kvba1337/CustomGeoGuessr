import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "@components/global/Header/Header/Header";
import GameSettingsGameMode from "@components/GameSettings/GameSettingsGameMode/GameSettingsGameMode";
import GameSettingsRounds from "@components/GameSettings/GameSettingsRounds/GameSettingsRounds";
import GameSettingsStartGameButton from "@components/GameSettings/GameSettingsStartGameButton/GameSettingsStartGameButton";
import GameSettingsTime from "@components/GameSettings/GameSettingsTime/GameSettingsTime";
import GameSettingsMapInfo from "@components/GameSettings/GameSettingsMapInfo/GameSettingsMapInfo";
import GameSettingsMode from "@components/GameSettings/GameSettingsMode/GameSettingsMode";
import "./GameSettingsPage.scss";

const GameSettingsPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { gameType } = useSelector((state) => state.gameSettings);

  return (
    <div className="game-settings-container">
      <Header />
      <div className="game-settings">
        <div className="game-settings__content">
          {!showSettings ? (
            <>
              <GameSettingsMode />
              <button
                className="settings-btn"
                onClick={() => setShowSettings(true)}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <GameSettingsMapInfo />
              {gameType === "classic" ? (
                <div className="settings">
                  <GameSettingsRounds />
                  <GameSettingsTime />
                  <GameSettingsGameMode />
                </div>
              ) : (
                <div className="settings">
                  <GameSettingsGameMode />
                </div>
              )}
              <GameSettingsStartGameButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSettingsPage;
