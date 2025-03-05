import { setRounds } from "@redux/actions/gameSettingsActions"
import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./GameSettingsRounds.scss"

const GameSettingsRounds = () => {
  const dispatch = useDispatch()
  const { rounds } = useSelector((state) => state.gameSettings)

  const handleRoundsChange = useCallback(
    (rounds) => {
      dispatch(setRounds(rounds))
    },
    [dispatch]
  )

  return (
    <div className="rounds">
      <h3>Number Of Rounds:</h3>
      <div className="rounds__options">
        {[3, 5, 10, 15].map((round) => (
          <label key={round} className={rounds === round ? "active" : ""}>
            <input
              type="radio"
              name="rounds"
              value={round}
              checked={rounds === round}
              onChange={() => handleRoundsChange(round)}
              id={`round-${round}`}
            />
            {round}
          </label>
        ))}
      </div>
    </div>
  )
}

export default React.memo(GameSettingsRounds)
