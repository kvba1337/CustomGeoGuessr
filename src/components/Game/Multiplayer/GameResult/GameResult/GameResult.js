import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame, resetGameState } from "@redux/actions/gameActions";
import useFetchGameResults from "@hooks/useFetchGameResults";
import GameResultMap from "../GameResultMap/GameResultMap";
import GameResultSummary from "../GameResultSummary/GameResultSummary";
import GameResultScoreItem from "../GameResultScoreItem/GameResultScoreItem";
import "./GameResult.scss";

const GameResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId, opponent } = useSelector((state) => state.room);
  const { userId, username, avatar } = useSelector((state) => state.user);
  const { totalRounds, gameLocations } = useSelector((state) => state.game);
  const [userResults, setUserResults] = useState([]);
  const [opponentResults, setOpponentResults] = useState([]);
  const [gameStatus, setGameStatus] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  useFetchGameResults(
    roomId,
    userId,
    setUserResults,
    setOpponentResults,
    setGameStatus
  );

  const userTotalScore = userResults.reduce(
    (acc, round) => acc + round.score,
    0
  );
  const opponentTotalScore = opponentResults.reduce(
    (acc, round) => acc + round.score,
    0
  );
  const userIsWinner = userTotalScore > opponentTotalScore;

  const handleShowSummary = useCallback(() => {
    setShowSummary(true);
  }, []);

  const handleContinue = useCallback(() => {
    dispatch(resetGame(roomId));
    dispatch(resetGameState());
    navigate("/multiplayer");
  }, [dispatch, navigate, roomId]);

  if (showSummary) {
    return (
      <div className="game-result">
        <div className="game-result__container">
          <GameResultSummary
            userResults={userResults}
            opponentResults={opponentResults}
            gameLocations={gameLocations}
            onContinue={handleContinue}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="game-result">
      <div className="game-result__container">
        <div className="game-result__header">
          <h1>{gameStatus}</h1>
        </div>

        <GameResultMap
          userResults={userResults}
          opponentResults={opponentResults}
        />

        <div className="game-result__score-container">
          <GameResultScoreItem
            avatar={avatar}
            username={username}
            score={userTotalScore}
            maxScore={totalRounds * 5000}
            isWinner={userIsWinner}
          />
          <GameResultScoreItem
            avatar={opponent.avatar}
            username={opponent.username}
            score={opponentTotalScore}
            maxScore={totalRounds * 5000}
            isWinner={!userIsWinner}
          />
        </div>

        <div className="game-result__buttons">
          <button className="buttons__summary-btn" onClick={handleShowSummary}>
            Game Summary
          </button>
          <button className="buttons__continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
