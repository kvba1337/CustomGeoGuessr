import { handleNextRound } from "@redux/actions/gameActions"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RoundResultHeader from "../RoundResultHeader/RoundResultHeader"
import RoundResultMap from "../RoundResultMap/RoundResultMap"
import RoundResultPlayersResults from "../RoundResultPlayersResults/RoundResultPlayersResults"
import RoundResultProgressBars from "../RoundResultProgressBars/RoundResultProgressBars"
import "./RoundResult.scss"

const RoundResult = () => {
  const dispatch = useDispatch()
  const { currentRound, roundResults, settings } = useSelector(
    (state) => state.game
  )
  const { userResult, opponentResult } = roundResults
  const { avatar, username } = useSelector((state) => state.user)
  const { opponent } = useSelector((state) => state.room)
  const gameMode = settings.gameMode.toUpperCase()

  const startNextRoundTimer = useCallback(() => {
    const timer = setTimeout(() => {
      dispatch(handleNextRound())
    }, 10000)
    return () => clearTimeout(timer)
  }, [dispatch])

  useEffect(() => {
    startNextRoundTimer()
  }, [startNextRoundTimer])

  return (
    <div className="round-result">
      <div className="round-result__content">
        <div className="map-container">
          <RoundResultHeader gameMode={gameMode} currentRound={currentRound} />
          <RoundResultMap />
          <RoundResultProgressBars
            avatar={avatar}
            userResult={userResult}
            opponentResult={opponentResult}
            opponentAvatar={opponent.avatar}
            settings={settings}
            username={username}
            opponentUsername={opponent.username}
          />
        </div>
        <RoundResultPlayersResults
          userResult={userResult}
          opponentResult={opponentResult}
          currentRound={currentRound}
        />
      </div>
    </div>
  )
}

export default React.memo(RoundResult)
