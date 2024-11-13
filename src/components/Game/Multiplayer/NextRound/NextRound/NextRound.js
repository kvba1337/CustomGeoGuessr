import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setGameStatus } from "@redux/actions/gameActions";
import Header from "../NextRoundHeader/NextRoundHeader";
import Players from "../NextRoundPlayers/NextRoundPlayers";
import NextRoundStart from "../NextRoundStart/NextRoundStart";
import NoGoogling from "../NextRoundNoGoogling/NextRoundNoGoogling";
import "./NextRound.scss";

const NextRound = () => {
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
      <Header gameMode={gameMode} />
      <Players
        currentRound={currentRound}
        username={username}
        avatar={avatar}
        opponent={opponent}
      />
      <NextRoundStart countdown={countdown} />
      <NoGoogling />
    </div>
  );
};

export default React.memo(NextRound);
