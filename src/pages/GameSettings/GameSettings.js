import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import SettingsRounds from "../../components/SettingsRounds/SettingsRounds";
import SettingsTime from "../../components/SettingsTime/SettingsTime";
import SettingsGameMode from "../../components/SettingsGameMode/SettingsGameMode";
import SettingsStartGameButton from "../../components/SettingsStartGameButton/SettingsStartGameButton";
import "./GameSettings.scss";

const GameSettings = () => {
  const { selectedMap } = useSelector((state) => state.map);

  return (
    <>
      <Header />
      <div className="game-settings">
        <h1 className="map-title">{selectedMap?.title}</h1>
        <p className="map-description">{selectedMap?.description}</p>
        <div className="settings">
          <SettingsRounds />
          <SettingsTime />
          <SettingsGameMode />
        </div>
        <SettingsStartGameButton />
      </div>
    </>
  );
};

export default GameSettings;
