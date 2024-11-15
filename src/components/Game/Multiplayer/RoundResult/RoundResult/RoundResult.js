import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import RoundResultMap from "../RoundResultMap/RoundResultMap";
import RoundResultHeader from "../RoundResultHeader/RoundResultHeader";
import RoundResultProgressBars from "../RoundResultProgressBars/RoundResultProgressBars";
import RoundResultPlayersResults from "../RoundResultPlayersResults/RoundResultPlayersResults";
import { handleNextRound } from "@redux/actions/gameActions";
import "./RoundResult.scss";

const RoundResult = () => {
  const dispatch = useDispatch();
  const { currentRound, roundResults, settings } = useSelector(
    (state) => state.game
  );
  const { userResult, opponentResult } = roundResults;
  const { avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const gameMode = settings.gameMode.toUpperCase();

  const startNextRoundTimer = useCallback(() => {
    const timer = setTimeout(() => {
      dispatch(handleNextRound());
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    startNextRoundTimer();
  }, [startNextRoundTimer]);

  return (
    <div className="round-result">
      <div className="map-container">
        <RoundResultHeader gameMode={gameMode} currentRound={currentRound} />
        <RoundResultMap />
        <RoundResultProgressBars
          avatar={avatar}
          userResult={userResult}
          opponentResult={opponentResult}
          opponentAvatar={opponent.avatar}
        />
      </div>
      <RoundResultPlayersResults
        userResult={userResult}
        opponentResult={opponentResult}
      />
    </div>
  );
};

export default React.memo(RoundResult);
