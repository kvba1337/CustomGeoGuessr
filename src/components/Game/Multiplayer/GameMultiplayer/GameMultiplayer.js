import React from "react";
import { useSelector } from "react-redux";
import useGameStateUpdates from "@hooks/useGameStateUpdates";

import "./GameMultiplayer.scss";
import NextRound from "../NextRound/NextRound/NextRound";
import HUDReturnButton from "../HUD/HUDReturnButton/HUDReturnButton";
import HUDRoundInfo from "../HUD/HUDRoundInfo/HUDRoundInfo";
import HUDTimer from "../HUD/HUDTimer/HUDTimer";
import StreetViewContainer from "../StreetViewContainer/StreetViewContainer";
import MiniMapContainer from "../MiniMap/MiniMapContainer/MiniMapContainer";
import GameResult from "../GameResult/GameResult/GameResult";
import RoundResult from "../RoundResult/RoundResult/RoundResult";

const GameMultiplayer = () => {
  useGameStateUpdates();
  const { status } = useSelector((state) => state.game);

  return (
    <div className="game-multiplayer">
      {status === "beforeRound" && <NextRound />}
      {status === "roundLive" && (
        <>
          <HUDReturnButton />
          <HUDRoundInfo />
          <HUDTimer />
          <StreetViewContainer />
          <MiniMapContainer />
        </>
      )}
      {status === "roundOver" && <RoundResult />}
      {status === "gameOver" && <GameResult />}
    </div>
  );
};

export default React.memo(GameMultiplayer);
