import React from "react"
import { useSelector } from "react-redux"
import "./HUDRoundInfo.scss"

const HUDRoundInfo = () => {
  const { currentRound, totalRounds, settings } = useSelector(
    (state) => state.game
  )
  const { gameType } = settings

  return (
    <div className="round-hud">
      <div className="round-hud__title">ROUND</div>
      <div className="round-hud__info">
        {gameType === "battle"
          ? currentRound
          : `${currentRound} / ${totalRounds}`}
      </div>
    </div>
  )
}

export default React.memo(HUDRoundInfo)
