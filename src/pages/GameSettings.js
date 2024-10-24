import React, { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RoundsSettings from "../components/RoundsSettings";
import TimeLimitSlider from "../components/TimeLimitSlider";
import GameModeSelector from "../components/GameModeSelector";
import "../styles/pages/GameSettings.scss";

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
          <RoundsSettings
            totalRounds={memoizedSettings.totalRounds}
            setTotalRounds={(value) => updateSettings("totalRounds", value)}
          />
          <TimeLimitSlider
            timeLimit={memoizedSettings.timeLimit}
            setTimeLimit={(value) => updateSettings("timeLimit", value)}
          />
          <GameModeSelector
            gameMode={memoizedSettings.gameMode}
            setGameMode={(value) => updateSettings("gameMode", value)}
          />
        </div>

        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </>
  );
};

export default GameSettings;
