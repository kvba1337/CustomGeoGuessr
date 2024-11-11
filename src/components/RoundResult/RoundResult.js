import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RoundResultMap from "../RoundResultMap/RoundResultMap";
import GameResultProgressBar from "../GameResultProgressBar/GameResultProgressBar";
import { handleNextRound } from "../../redux/actions/gameActions";
import "./RoundResult.scss";

const RoundResult = () => {
  const dispatch = useDispatch();
  const { currentRound, roundResults, settings } = useSelector(
    (state) => state.game
  );
  const { userResult, opponentResult } = roundResults;
  const { username, avatar } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);
  const gameMode = settings.gameMode.toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleNextRound());
    }, 15000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="round-result">
      <div className="map-container">
        <div className="round-result-header">
          <h1>DUELS</h1>
          <h2>{gameMode}</h2>
          <h3>ROUND {currentRound}</h3>
        </div>

        <RoundResultMap />

        <div className="progress-bars">
          <div className="progress-bar progress-bar--left">
            <img src={avatar} alt="User Avatar" className="avatar" />
            <GameResultProgressBar
              value={userResult?.score || 0}
              max={5000}
              player="user"
            />
          </div>
          <div className="progress-bar progress-bar--right">
            <GameResultProgressBar
              value={opponentResult?.score || 0}
              max={5000}
              player="opponent"
            />
            <img
              src={opponent.avatar}
              alt="Opponent Avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>

      <div className="results">
        <div className="results__distance">
          <p className="player-result">{userResult?.distanceToTarget || 0}</p>
          <p className="separator">DISTANCE FROM LOCATION</p>
          <p className="player-result">
            {opponentResult?.distanceToTarget || 0}
          </p>
        </div>

        <div className="results__score">
          <p className="player-score">{userResult?.score || 0}</p>
          <p className="separator">ROUND SCORE</p>
          <p className="player-score">{opponentResult?.score || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default RoundResult;
