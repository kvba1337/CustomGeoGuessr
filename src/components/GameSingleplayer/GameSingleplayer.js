import React from "react";
import StreetViewMap from "../StreetViewMap/StreetViewMap";
import HUDTimer from "../HUDTimer/HUDTimer";
import HUDRoundInfo from "../HUDRoundInfo/HUDRoundInfo";
import HUDReturnButton from "../HUDReturnButton/HUDReturnButton";
import MiniMapContainer from "../MiniMapContainer/MiniMapContainer";
import RoundResult from "../RoundResult/RoundResult";
import GameResult from "../GameResult/GameResult";
import "./GameSingleplayer.scss";

const GameSingleplayer = () => {
  return (
    <div className="game-page">
      <HUDTimer />

      <HUDRoundInfo />

      <HUDReturnButton />

      <StreetViewMap />

      <MiniMapContainer />

      <div className="transparent-overlay"></div>

      <RoundResult />

      <GameResult />
    </div>
  );
};

export default GameSingleplayer;
