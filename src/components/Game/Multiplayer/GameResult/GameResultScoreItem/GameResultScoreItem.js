import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "./GameResultScoreItem.scss";

const GameResultScoreItem = ({
  avatar,
  username,
  userResults,
  opponentResults,
  reverse,
}) => {
  const { settings } = useSelector((state) => state.game);
  const { gameType } = settings;

  const opponentTotalScore = useMemo(() => {
    if (!Array.isArray(opponentResults) || opponentResults.length === 0) {
      return 0;
    }

    const validResults = opponentResults.filter((result) => result !== null);
    return validResults.reduce((acc, result) => acc + (result.score || 0), 0);
  }, [opponentResults]);

  const stats = useMemo(() => {
    if (!Array.isArray(userResults) || userResults.length === 0) {
      return {
        bestScore: 0,
        averageDistance: 0,
        totalScore: 0,
      };
    }

    const validResults = userResults.filter((result) => result !== null);

    const bestScore = Math.max(
      ...validResults.map((result) => result.score || 0)
    );

    const totalDistance = validResults.reduce((acc, result) => {
      const distance = parseFloat(result.distanceToTarget);
      return acc + (isNaN(distance) ? 0 : distance);
    }, 0);
    const averageDistance = (totalDistance / validResults.length).toFixed(0);

    const totalScore = validResults.reduce(
      (acc, result) => acc + (result.score || 0),
      0
    );

    return {
      bestScore,
      averageDistance,
      totalScore,
    };
  }, [userResults]);

  const isUserWinner = useMemo(() => {
    if (!opponentTotalScore || !stats.totalScore) return false;
    return stats.totalScore > opponentTotalScore;
  }, [stats.totalScore, opponentTotalScore]);

  return (
    <div className={`score-container__item ${reverse ? "reverse" : ""}`}>
      <div className={`avatar-container ${reverse ? "reverse" : ""}`}>
        <div className={`game-result__stats ${reverse ? "reverse" : ""}`}>
          <div className="stat-item">
            <div className="stat-label">
              <i className="fas fa-trophy"></i>
              <span>Best Score</span>
            </div>
            <div className="stat-value">{stats.bestScore}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">
              <i className="fas fa-map-marker-alt"></i>
              <span>Avg Distance</span>
            </div>
            <div className="stat-value distance">
              {stats.averageDistance} km
            </div>
          </div>
          {gameType !== "battle" && (
            <div className="stat-item">
              <div className="stat-label">
                <i className="fas fa-star"></i>
                <span>Total Score</span>
              </div>
              <div className="stat-value totalScore">{stats.totalScore}</div>
            </div>
          )}
        </div>
        <div className="avatar-info">
          <img
            src={avatar}
            alt="Player"
            className={`avatar ${isUserWinner ? "winner" : ""}`}
          />
          <p className="username">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameResultScoreItem);
