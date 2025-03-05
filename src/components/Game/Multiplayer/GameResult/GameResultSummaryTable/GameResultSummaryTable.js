import React from "react"
import { useSelector } from "react-redux"
import "./GameResultSummaryTable.scss"

const GameResultSummaryTable = ({
  gameLocations,
  userResultsArray,
  opponentResultsArray,
  opponentUsername,
  onRowClick,
}) => {
  const { settings } = useSelector((state) => state.game)
  const { gameType } = settings

  const completedRounds = userResultsArray.filter((result) => result !== null)

  return (
    <div className="summary-table-container">
      <table className="summary-table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Your Score</th>
            <th>{opponentUsername} Score</th>
            <th>{gameType === "battle" ? "Your Health" : "Your Total"}</th>
            <th>
              {gameType === "battle" ? "Opponent Health" : "Opponent Total"}
            </th>
          </tr>
        </thead>
        <tbody>
          {completedRounds.map((_, index) => {
            const userPrevHp =
              index === 0 ? 6000 : userResultsArray[index - 1]?.remainingHp
            const userCurrentHp = userResultsArray[index]?.remainingHp
            const userDamageTaken = userPrevHp - userCurrentHp

            const opponentPrevHp =
              index === 0 ? 6000 : opponentResultsArray[index - 1]?.remainingHp
            const opponentCurrentHp = opponentResultsArray[index]?.remainingHp
            const opponentDamageTaken = opponentPrevHp - opponentCurrentHp

            return (
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
                  {gameType === "battle" ? (
                    <>
                      {userCurrentHp}
                      <br />
                      <span
                        className={`damage ${
                          userDamageTaken > 0 ? "damage--taken" : ""
                        }`}
                      >
                        {userDamageTaken > 0 ? `-${userDamageTaken}` : "0"}
                      </span>
                    </>
                  ) : (
                    <>
                      {userResultsArray
                        .slice(0, index + 1)
                        .reduce((acc, round) => acc + (round?.score || 0), 0)}
                      <br />
                      <span
                        className={`gained-points ${
                          userResultsArray[index]?.score > 0
                            ? "gained-points--gained"
                            : ""
                        }`}
                      >
                        +{userResultsArray[index]?.score || 0}
                      </span>
                    </>
                  )}
                </td>
                <td className="points">
                  {gameType === "battle" ? (
                    <>
                      {opponentCurrentHp}
                      <br />
                      <span
                        className={`damage ${
                          opponentDamageTaken > 0 ? "damage--taken" : ""
                        }`}
                      >
                        {opponentDamageTaken > 0
                          ? `-${opponentDamageTaken}`
                          : "0"}
                      </span>
                    </>
                  ) : (
                    <>
                      {opponentResultsArray
                        .slice(0, index + 1)
                        .reduce((acc, round) => acc + (round?.score || 0), 0)}
                      <br />
                      <span
                        className={`gained-points ${
                          opponentResultsArray[index]?.score > 0
                            ? "gained-points--gained"
                            : ""
                        }`}
                      >
                        +{opponentResultsArray[index]?.score || 0}
                      </span>
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(GameResultSummaryTable)
