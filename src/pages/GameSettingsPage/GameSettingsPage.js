import React from "react";
import Header from "@components/global/Header/Header/Header";
import GameSettingsGameMode from "@components/GameSettings/GameSettingsGameMode/GameSettingsGameMode";
import GameSettingsRounds from "@components/GameSettings/GameSettingsRounds/GameSettingsRounds";
import GameSettingsStartGameButton from "@components/GameSettings/GameSettingsStartGameButton/GameSettingsStartGameButton";
import GameSettingsTime from "@components/GameSettings/GameSettingsTime/GameSettingsTime";
import GameSettingsMapInfo from "@components/GameSettings/GameSettingsMapInfo/GameSettingsMapInfo";
import "./GameSettingsPage.scss";

const GameSettingsPage = () => {
  return (
    <div className="game-settings-container">
      <Header />
      <div className="game-settings">
        <div className="game-settings__content">
          <GameSettingsMapInfo />
          <div className="settings">
            <GameSettingsRounds />
            <GameSettingsTime />
            <GameSettingsGameMode />
          </div>
          <GameSettingsStartGameButton />
        </div>
      </div>
    </div>
  );
};

export default GameSettingsPage;
