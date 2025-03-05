import useFetchGameResults from "@hooks/useFetchGameResults"
import { resetGame, resetGameState } from "@redux/actions/gameActions"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GameResultButtons from "../GameResultButtons/GameResultButtons"
import GameResultMap from "../GameResultMap/GameResultMap"
import GameResultScoreItem from "../GameResultScoreItem/GameResultScoreItem"
import GameResultSummary from "../GameResultSummary/GameResultSummary"
import "./GameResult.scss"

const GameResult = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { roomId, opponent } = useSelector((state) => state.room)
  const { userId, username, avatar } = useSelector((state) => state.user)
  const { gameLocations } = useSelector((state) => state.game)
  const [userResults, setUserResults] = useState([])
  const [opponentResults, setOpponentResults] = useState([])
  const [gameStatus, setGameStatus] = useState("")
  const [showSummary, setShowSummary] = useState(false)

  useFetchGameResults(
    roomId,
    userId,
    setUserResults,
    setOpponentResults,
    setGameStatus
  )

  const handleShowSummary = useCallback(() => {
    setShowSummary(true)
  }, [])

  const handleContinue = useCallback(() => {
    dispatch(resetGame(roomId))
    dispatch(resetGameState())
    navigate("/multiplayer")
  }, [dispatch, navigate, roomId])

  if (showSummary) {
    return (
      <div className="game-result">
        <div className="game-result__container">
          <GameResultSummary
            userResults={userResults}
            opponentResults={opponentResults}
            gameLocations={gameLocations}
            onContinue={handleContinue}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="game-result">
      <div className="game-result__container">
        <div className="game-result__header">
          <h1>{gameStatus}</h1>
        </div>

        <GameResultMap
          userResults={userResults}
          opponentResults={opponentResults}
        />

        <div className="game-result__score-container">
          <GameResultScoreItem
            avatar={avatar}
            username={username}
            userResults={userResults}
            opponentResults={opponentResults}
          />
          <GameResultScoreItem
            avatar={opponent.avatar}
            username={opponent.username}
            userResults={opponentResults}
            opponentResults={userResults}
            reverse
          />
        </div>

        <GameResultButtons
          onShowSummary={handleShowSummary}
          onContinue={handleContinue}
        />
      </div>
    </div>
  )
}

export default GameResult
