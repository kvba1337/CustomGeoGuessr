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
    <div className="settings-btn-container">
      <button className="settings-btn" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default React.memo(GameSettingsStartGameButton);
