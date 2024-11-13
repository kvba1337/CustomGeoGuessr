import React from "react";
import { useSelector } from "react-redux";

import Header from "@components/global/Header/Header/Header";
import GameSettingsGameMode from "@components/GameSettings/GameSettingsGameMode/GameSettingsGameMode";
import GameSettingsRounds from "@components/GameSettings/GameSettingsRounds/GameSettingsRounds";
import GameSettingsStartGameButton from "@components/GameSettings/GameSettingsStartGameButton/GameSettingsStartGameButton";
import GameSettingsTime from "@components/GameSettings/GameSettingsTime/GameSettingsTime";
import "./GameSettingsPage.scss";

const GameSettingsPage = () => {
  const { selectedMap } = useSelector((state) => state.map);

  return (
    <>
      <Header />
      <div className="game-settings">
        <h1 className="map-title">{selectedMap?.title}</h1>
        <p className="map-description">{selectedMap?.description}</p>
        <div className="settings">
          <GameSettingsRounds />
          <GameSettingsTime />
          <GameSettingsGameMode />
        </div>
        <GameSettingsStartGameButton />
      </div>
    </>
  );
};

export default GameSettingsPage;
