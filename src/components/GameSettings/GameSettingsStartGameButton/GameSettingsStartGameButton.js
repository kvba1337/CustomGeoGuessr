import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { startGame } from "@redux/actions/gameSettingsActions";
import "./GameSettingsStartGameButton.scss";

const GameSettingsStartGameButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useSelector((state) => state.room);
  const settings = useSelector((state) => state.gameSettings);

  const handleStartGame = useCallback(async () => {
    await dispatch(startGame(roomId, settings));
    navigate("/game");
  }, [dispatch, navigate, roomId, settings]);

  return (
    <button
      className="button button-primary button-lg"
      onClick={handleStartGame}
    >
      <div className="button-wrapper">
        <span className="button-label">Start Game</span>
      </div>
    </button>
  );
};

export default React.memo(GameSettingsStartGameButton);
