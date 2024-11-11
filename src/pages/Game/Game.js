import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GameMultiplayer from "../../components/GameMultiplayer/GameMultiplayer";
import useFirebaseData from "../../hooks/useFirebaseData";

import "./Game.scss";

const Game = () => {
  const { roomId } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useFirebaseData(roomId, userId);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
  }, [roomId, navigate]);

  return (
    <div className="game-page">
      <GameMultiplayer />
    </div>
  );
};

export default Game;
