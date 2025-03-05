import React from "react"
import { useSelector } from "react-redux"
import "./RoundResultHeader.scss"

const RoundResultHeader = ({ gameMode, currentRound }) => {
  const { settings } = useSelector((state) => state.game)
  const { gameType } = settings
  const multiplier = 1.0 + Math.max(0, Math.floor(currentRound - 4)) * 0.5
  const formatMultiplier = (value) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1)
  }

  return (
    <div className="round-result-header">
      <div className="game-info">
        <h1>DUELS</h1>
        <h2>{gameMode}</h2>
      </div>
      <div className="current-round">
        ROUND {currentRound}
        {gameType === "battle" && currentRound > 1 && (
          <span> - {formatMultiplier(multiplier)}x DAMAGE</span>
        )}
      </div>
    </div>
  )
}

export default React.memo(RoundResultHeader)
