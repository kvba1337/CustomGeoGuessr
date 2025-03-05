import { setGameStatus } from "@redux/actions/gameActions"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NextRoundHeader from "../NextRoundHeader/NextRoundHeader"
import NextRoundNoGoogling from "../NextRoundNoGoogling/NextRoundNoGoogling"
import NextRoundPlayers from "../NextRoundPlayers/NextRoundPlayers"
import NextRoundStart from "../NextRoundStart/NextRoundStart"
import "./NextRound.scss"

const NextRound = () => {
  const dispatch = useDispatch()
  const [countdown, setCountdown] = useState(5)
  const { currentRound, settings, selectedMap } = useSelector(
    (state) => state.game
  )
  const { username, avatar } = useSelector((state) => state.user)
  const { opponent } = useSelector((state) => state.room)
  const gameMode = settings?.gameMode?.toUpperCase() || ""

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      dispatch(setGameStatus("roundLive"))
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [dispatch])

  return (
    <div className="next-round-info">
      <div className="next-round-info__content">
        <NextRoundHeader
          currentRound={currentRound}
          gameMode={gameMode}
          map={selectedMap}
        />
        <NextRoundPlayers
          username={username}
          avatar={avatar}
          opponent={opponent}
          currentRound={currentRound}
        />
        <NextRoundStart countdown={countdown} />
        <NextRoundNoGoogling />
      </div>
    </div>
  )
}

export default React.memo(NextRound)
