import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { database } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { resetGame, resetGameState } from "../../redux/actions/gameActions";
import GameResultMap from "../GameResultMap/GameResultMap";
import GameResultProgressBar from "../GameResultProgressBar/GameResultProgressBar";
import GameResultSummary from "../GameResultSummary/GameResultSummary";
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

  useEffect(() => {
    const fetchResults = async () => {
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const usersSnapshot = await get(usersRef);
      const users = usersSnapshot.val();

      const opponentId = Object.keys(users).find((id) => id !== userId);

      const userResultsRef = ref(
        database,
        `rooms/${roomId}/users/${userId}/roundsResults`
      );
      const userResultsSnapshot = await get(userResultsRef);
      const userResultsData = userResultsSnapshot.val();

      const opponentResultsRef = ref(
        database,
        `rooms/${roomId}/users/${opponentId}/roundsResults`
      );
      const opponentResultsSnapshot = await get(opponentResultsRef);
      const opponentResultsData = opponentResultsSnapshot.val();

      setUserResults(Object.values(userResultsData || {}));
      setOpponentResults(Object.values(opponentResultsData || {}));

      const userTotalScore = Object.values(userResultsData || {}).reduce(
        (acc, round) => acc + round.score,
        0
      );
      const opponentTotalScore = Object.values(
        opponentResultsData || {}
      ).reduce((acc, round) => acc + round.score, 0);

      setGameStatus(
        userTotalScore > opponentTotalScore ? "YOU WON" : "YOU LOST"
      );
    };

    fetchResults();
  }, [roomId, userId]);

  const userTotalScore = userResults.reduce(
    (acc, round) => acc + round.score,
    0
  );
  const opponentTotalScore = opponentResults.reduce(
    (acc, round) => acc + round.score,
    0
  );

  const userIsWinner = userTotalScore > opponentTotalScore;

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleContinue = () => {
    dispatch(resetGame(roomId));
    dispatch(resetGameState());

    navigate("/multiplayer");
  };

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
          <div className="score-container__item">
            <div className="avatar-container">
              <img
                src={avatar}
                alt="Player 1"
                className={`avatar ${userIsWinner ? "winner" : ""}`}
              />
            </div>
            <div className="score-container__progress">
              <GameResultProgressBar
                value={userTotalScore}
                max={totalRounds * 5000}
              />
              <p className="score">{userTotalScore}</p>
            </div>
          </div>
          <div className="score-container__item">
            <div className="score-container__progress">
              <GameResultProgressBar
                value={opponentTotalScore}
                max={totalRounds * 5000}
              />
              <p className="score">{opponentTotalScore}</p>
            </div>
            <div className="avatar-container">
              <img
                src={opponent.avatar}
                alt="Player 2"
                className={`avatar ${!userIsWinner ? "winner" : ""}`}
              />
            </div>
          </div>
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
