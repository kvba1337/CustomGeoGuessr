import Header from "@components/global/Header/Header/Header"
import ModalHost from "@components/Multiplayer/Modals/ModalHost/ModalHost"
import ModalJoin from "@components/Multiplayer/Modals/ModalJoin/ModalJoin"
import MultiplayerButtons from "@components/Multiplayer/MultiplayerButtons/MultiplayerButtons"
import MultiplayerContainer from "@components/Multiplayer/MultiplayerContainer/MultiplayerContainer"
import React, { useState } from "react"
import "./MultiplayerPage.scss"

const MultiplayerPage = () => {
  const [showHostModal, setShowHostModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  return (
    <div className="multiplayer-container">
      <Header />
      <div className="multiplayer-content">
        <MultiplayerContainer />
        <MultiplayerButtons
          onHostClick={() => setShowHostModal(true)}
          onJoinClick={() => setShowJoinModal(true)}
        />
        {showHostModal && <ModalHost onClose={() => setShowHostModal(false)} />}
        {showJoinModal && <ModalJoin onClose={() => setShowJoinModal(false)} />}
      </div>
    </div>
  )
}

export default MultiplayerPage
