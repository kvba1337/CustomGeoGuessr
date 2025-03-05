import { setGameMode } from "@redux/actions/gameSettingsActions"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./GameSettingsGameMode.scss"

const GameSettingsGameMode = () => {
  const dispatch = useDispatch()
  const { gameMode } = useSelector((state) => state.gameSettings)

  const handleGameModeChange = useCallback(
    (e) => {
      dispatch(setGameMode(e.target.value))
    },
    [dispatch]
  )

  return (
    <div className="game-mode">
      <h3>Game Mode:</h3>
      <div className="game-mode__labels">
        {["Move", "NoMove", "NMPZ"].map((mode) => (
          <label key={mode} className={gameMode === mode ? "active" : ""}>
            <input
              type="radio"
              name="gameMode"
              value={mode}
              checked={gameMode === mode}
              onChange={handleGameModeChange}
            />
            {mode}
          </label>
        ))}
      </div>
    </div>
  )
}

export default React.memo(GameSettingsGameMode)
