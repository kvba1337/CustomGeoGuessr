import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameStatus } from "../../redux/actions/gameActions";
import "./NextRoundInfo.scss";

const NextRoundInfo = () => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(5);
  const { currentRound, settings } = useSelector((state) => state.game);
  const { username, avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const gameMode = settings?.gameMode?.toUpperCase() || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      dispatch(setGameStatus("roundLive"));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <div className="next-round-info">
      <div className="next-round-info__header">
        <h1>DUELS</h1>
        <h2>{gameMode}</h2>
      </div>
      <div className="players">
        <div className="current-round">ROUND {currentRound}</div>
        <div className="player">
          <img src={avatar} alt="Player 1" className="avatar" />
          <p>{username.toUpperCase()}</p>
        </div>
        <p className="vs">VS</p>
        <div className="player">
          <img src={opponent.avatar} alt="Player 2" className="avatar" />
          <p>{opponent.username.toUpperCase()}</p>
        </div>
      </div>
      <div className="next-round-start">
        NEXT ROUND STARTS IN
        <div className="countdown">{String(countdown).padStart(2, "0")}</div>
      </div>
      <div className="no-googling">REMEMBER: GOOGLING IS NOT ALLOWED</div>
    </div>
  );
};

export default NextRoundInfo;
