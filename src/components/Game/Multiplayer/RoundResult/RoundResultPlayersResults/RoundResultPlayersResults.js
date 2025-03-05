import { calculateDamage } from "@utils/gameUtils"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./RoundResultPlayersResults.scss"

const RoundResultPlayersResults = ({
  userResult,
  opponentResult,
  currentRound,
}) => {
  const { settings } = useSelector((state) => state.game)
  const { gameType } = settings
  const [userScore, setUserScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [isUserWinner, setIsUserWinner] = useState(false)
  const [isOpponentWinner, setIsOpponentWinner] = useState(false)
  const [userHitDirection, setUserHitDirection] = useState("")
  const [opponentHitDirection, setOpponentHitDirection] = useState("")
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const animateScore = (start, end, duration, setScore) => {
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const current = Math.min(
          start + (end - start) * (progress / duration),
          end
        )
        setScore(Math.floor(current))
        if (progress < duration) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }

    const animateScoreTimeout = setTimeout(() => {
      animateScore(0, userResult?.score || 0, 1000, setUserScore)
      animateScore(0, opponentResult?.score || 0, 1000, setOpponentScore)
    }, 2500)

    let damage
    if (userResult?.score > opponentResult?.score && gameType === "battle") {
      setIsUserWinner(true)
      setUserHitDirection("hit-right")
      damage = calculateDamage(
        userResult.score,
        opponentResult.score,
        currentRound
      )
      setTimeout(() => {
        setUserScore(damage)
      }, 4900)
    } else if (
      opponentResult?.score > userResult?.score &&
      gameType === "battle"
    ) {
      setIsOpponentWinner(true)
      setOpponentHitDirection("hit-left")
      damage = calculateDamage(
        opponentResult.score,
        userResult.score,
        currentRound
      )
      setTimeout(() => {
        setOpponentScore(damage)
      }, 4900)
    }

    const particlesTimeout = setTimeout(() => {
      if (gameType === "battle") {
        setShowParticles(true)
      }
    }, 4880)

    return () => {
      clearTimeout(animateScoreTimeout)
      clearTimeout(particlesTimeout)
    }
  }, [userResult, opponentResult, currentRound, gameType])

  const renderParticles = () => {
    return Array.from({ length: 20 }).map((_, index) => (
      <span key={index} className="explosion-particle" />
    ))
  }

  const multiplier = 1.0 + Math.max(0, Math.floor(currentRound - 4)) * 0.5
  const formatMultiplier = (value) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1)
  }

  return (
    <div className="results">
      <div className="results__distance">
        <p className="player-result">{userResult?.distanceToTarget || 0}</p>
        <p className="separator">DISTANCE FROM LOCATION</p>
        <p className="player-result">{opponentResult?.distanceToTarget || 0}</p>
      </div>
      <div className="results__score">
        <p
          className={`player-score 
            ${gameType === "battle" ? "battle-mode" : ""} 
            ${isUserWinner ? "winner" : "loser"} 
            ${userHitDirection}`}
        >
          {userScore}
          {isUserWinner && showParticles && renderParticles()}
        </p>
        <p className="separator">
          ROUND RESULT
          {gameType === "battle" && currentRound > 1 && (
            <span className="multiplier">x{formatMultiplier(multiplier)}</span>
          )}
        </p>
        <p
          className={`player-score 
            ${gameType === "battle" ? "battle-mode" : ""} 
            ${isOpponentWinner ? "winner" : "loser"} ${opponentHitDirection}`}
        >
          {opponentScore}
          {isOpponentWinner && showParticles && renderParticles()}
        </p>
      </div>
    </div>
  )
}

export default React.memo(RoundResultPlayersResults)
