import React, { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SettingsRounds from "../../components/SettingsRounds/SettingsRounds";
import SettingsTime from "../../components/SettingsTime/SettingsTime";
import SettingsGameMode from "../../components/SettingsGameMode/SettingsGameMode";
import SettingsStartGameButton from "../../components/SettingsStartGameButton/SettingsStartGameButton";
import "./GameSettings.scss";

const initialSettings = {
  totalRounds: 5,
  timeLimit: 60,
  gameMode: "move",
};

const GameSettings = () => {
  const {
    state: { selectedMap },
  } = useLocation();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(initialSettings);

  const handleStartGame = useCallback(() => {
    navigate("/game", {
      state: {
        selectedMap,
        selectedTotalRounds: settings.totalRounds,
        selectedTimeLimit: settings.timeLimit,
        selectedGameMode: settings.gameMode,
      },
    });
  }, [navigate, selectedMap, settings]);

  const updateSettings = useCallback((key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  }, []);

  const memoizedSettings = useMemo(() => settings, [settings]);

  return (
    <>
      <Header />
      <div className="game-settings">
        <h1>{selectedMap.name}</h1>
        <p>{selectedMap.description}</p>

        <div className="settings">
          <SettingsRounds
            totalRounds={memoizedSettings.totalRounds}
            setTotalRounds={(value) => updateSettings("totalRounds", value)}
          />
          <SettingsTime
            timeLimit={memoizedSettings.timeLimit}
            setTimeLimit={(value) => updateSettings("timeLimit", value)}
          />
          <SettingsGameMode
            gameMode={memoizedSettings.gameMode}
            setGameMode={(value) => updateSettings("gameMode", value)}
          />
        </div>

        <SettingsStartGameButton
          className="settings-btn"
          onClick={handleStartGame}
        />
      </div>
    </>
  );
};

export default GameSettings;
