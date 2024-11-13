import React from "react";
import "./GameResultSummaryTable.scss";

const GameResultSummaryTable = ({
  gameLocations,
  userResultsArray,
  opponentResultsArray,
  opponentUsername,
  onRowClick,
}) => (
  <table className="summary-table">
    <thead>
      <tr>
        <th></th>
        <th>YOUR SCORE</th>
        <th>{opponentUsername.toUpperCase()} SCORE</th>
        <th>YOUR TOTAL SCORE</th>
        <th>{opponentUsername.toUpperCase()} TOTAL SCORE</th>
      </tr>
    </thead>
    <tbody>
      {gameLocations.map((_, index) => (
        <tr key={index} onClick={() => onRowClick(index)}>
          <td className="round">Round {index + 1}</td>
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
);

export default React.memo(GameResultSummaryTable);
