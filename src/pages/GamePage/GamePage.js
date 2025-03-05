import GameMultiplayer from "@components/Game/Multiplayer/GameMultiplayer/GameMultiplayer"
import useFirebaseData from "@hooks/useFirebaseData"
import React from "react"
import { useSelector } from "react-redux"
import "./GamePage.scss"

const GamePage = () => {
  const { roomId } = useSelector((state) => state.room)
  const { userId } = useSelector((state) => state.user)

  useFirebaseData(roomId, userId)

  return (
    <div className="game-page">
      <GameMultiplayer />
    </div>
  )
}

export default React.memo(GamePage)
