import React, { useState } from "react";
import Header from "../../components/Header/Header";
import HostModal from "../../components/HostModal/HostModal";
import JoinModal from "../../components/JoinModal/JoinModal";
import MultiplayerContainer from "../../components/MultiplayerContainer/MultiplayerContainer";
import MultiplayerButtons from "../../components/MultiplayerButtons/MultiplayerButtons";
import "./Multiplayer.scss";

const Multiplayer = () => {
  const [showHostModal, setShowHostModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <>
      <Header />
      <div className="multiplayer">
        <MultiplayerContainer />
        <MultiplayerButtons
          onHostClick={() => setShowHostModal(true)}
          onJoinClick={() => setShowJoinModal(true)}
        />
        {showHostModal && <HostModal onClose={() => setShowHostModal(false)} />}
        {showJoinModal && <JoinModal onClose={() => setShowJoinModal(false)} />}
      </div>
    </>
  );
};

export default Multiplayer;
