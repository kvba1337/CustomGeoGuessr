import React from "react";
import "./GameResultSummaryTable.scss";

const GameResultSummaryTable = ({
  gameLocations,
  userResultsArray,
  opponentResultsArray,
  opponentUsername,
  onRowClick,
}) => (
  <div className="summary-table-container">
    <table className="summary-table">
      <thead>
        <tr>
          <th>Round</th>
          <th>Your Score</th>
          <th>Opponent Score</th>
          <th>Your Total</th>
          <th>Opponent Total</th>
        </tr>
      </thead>
      <tbody>
        {gameLocations.map((_, index) => (
          <tr key={index} onClick={() => onRowClick(index)}>
            <td className="round">{index + 1}</td>
            <td className="points">
              {userResultsArray[index]?.score || 0} points
              <br />
              <span className="distance">
                {userResultsArray[index]?.distanceToTarget || "N/A"}
              </span>
            </td>
            <td className="points">
              {opponentResultsArray[index]?.score || 0} points
              <br />
              <span className="distance">
                {opponentResultsArray[index]?.distanceToTarget || "N/A"}
              </span>
            </td>
            <td className="points">
              {userResultsArray
                .slice(0, index + 1)
                .reduce((acc, round) => acc + (round.score || 0), 0)}
              <br />
              <span className="gained-points">
                +{userResultsArray[index]?.score || 0}
              </span>
            </td>
            <td className="points">
              {opponentResultsArray
                .slice(0, index + 1)
                .reduce((acc, round) => acc + (round.score || 0), 0)}
              <br />
              <span className="gained-points">
                +{opponentResultsArray[index]?.score || 0}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default React.memo(GameResultSummaryTable);
