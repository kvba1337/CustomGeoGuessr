import { setGameType } from "@redux/actions/gameSettingsActions"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import "./GameSettingsMode.scss"

const GameSettingsMode = () => {
  const dispatch = useDispatch()
  const { gameType } = useSelector((state) => state.gameSettings)

  const handleGameTypeChange = (type) => {
    dispatch(setGameType(type))
  }

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleGameTypeChange(type)
    }
  }

  return (
    <div className="game-type">
      <h2>Select Game Type</h2>
      <div className="game-type__options">
        <button
          className={`game-type__option ${
            gameType === "classic" ? "active" : ""
          }`}
          onClick={() => handleGameTypeChange("classic")}
          onKeyDown={(e) => handleKeyDown(e, "classic")}
          aria-pressed={gameType === "classic"}
          type="button"
        >
          <h3>Classic Mode</h3>
          <p>Play with predefined number of rounds and time limit</p>
          <ul>
            <li>Choose number of rounds</li>
            <li>Set time limit per round</li>
            <li>Select movement restrictions</li>
          </ul>
        </button>
        <button
          className={`game-type__option ${
            gameType === "battle" ? "active" : ""
          }`}
          onClick={() => handleGameTypeChange("battle")}
          onKeyDown={(e) => handleKeyDown(e, "battle")}
          aria-pressed={gameType === "battle"}
          type="button"
        >
          <h3>Battle Mode</h3>
          <p>Fight until one player runs out of health points</p>
          <ul>
            <li>Start with 6000 HP</li>
            <li>Damage based on distance difference</li>
            <li>15s timer after first guess</li>
            <li>Select movement restrictions</li>
          </ul>
        </button>
      </div>
    </div>
  )
}

export default GameSettingsMode
