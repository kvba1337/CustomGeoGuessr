import useGameStateUpdates from "@hooks/useGameStateUpdates"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./GameMultiplayer.scss"
import GameResult from "../GameResult/GameResult/GameResult"
import HUDPlayerProgress from "../HUD/HUDPlayerProgress/HUDPlayerProgress"
import HUDReturnButton from "../HUD/HUDReturnButton/HUDReturnButton"
import HUDRoundInfo from "../HUD/HUDRoundInfo/HUDRoundInfo"
import HUDTimer from "../HUD/HUDTimer/HUDTimer"
import MiniMapContainer from "../MiniMap/MiniMapContainer/MiniMapContainer"
import MiniMapContainerMobile from "../MiniMap/MiniMapContainerMobile/MiniMapContainerMobile"
import NextRound from "../NextRound/NextRound/NextRound"
import RoundResult from "../RoundResult/RoundResult/RoundResult"
import StreetViewContainer from "../StreetViewContainer/StreetViewContainer"

const GameMultiplayer = () => {
  useGameStateUpdates()
  const { status, settings } = useSelector((state) => state.game)
  const isMobile = window.innerWidth <= 768
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [isSlidingDown, setIsSlidingDown] = useState(false)

  const closeMap = () => {
    setIsSlidingDown(true)
    setTimeout(() => {
      setIsMapVisible(false)
      setIsSlidingDown(false)
    }, 500)
  }

  return (
    <div className="game-multiplayer">
      {status === "beforeRound" && <NextRound />}
      {status === "roundLive" && (
        <>
          {settings.gameType === "battle" ? (
            <div className="players-progress">
              <HUDPlayerProgress />
              <HUDPlayerProgress isReversed={true} />
            </div>
          ) : (
            <HUDRoundInfo />
          )}
          <HUDReturnButton />
          <HUDTimer />
          <StreetViewContainer closeMap={closeMap} isMobile={isMobile} />
          {isMobile ? (
            <MiniMapContainerMobile
              isMapVisible={isMapVisible}
              setIsMapVisible={setIsMapVisible}
              isSlidingDown={isSlidingDown}
              setIsSlidingDown={setIsSlidingDown}
            />
          ) : (
            <MiniMapContainer />
          )}
        </>
      )}
      {status === "roundOver" && <RoundResult />}
      {status === "gameOver" && <GameResult />}
    </div>
  )
}

export default React.memo(GameMultiplayer)
