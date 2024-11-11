import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startGame } from "../../redux/actions/gameSettingsActions";
import "./SettingsStartGameButton.scss";

const SettingsStartGameButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useSelector((state) => state.room);
  const settings = useSelector((state) => state.gameSettings);

  const handleStartGame = async () => {
    await dispatch(startGame(roomId, settings));
    navigate("/game");
  };

  return (
    <button className="settings-btn" onClick={handleStartGame}>
      Start Game
    </button>
  );
};

export default SettingsStartGameButton;
