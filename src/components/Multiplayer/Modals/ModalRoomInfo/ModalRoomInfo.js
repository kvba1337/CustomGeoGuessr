import React from "react";
import "./ModalRoomInfo.scss";

const ModalRoomInfo = ({ roomId, status, handleContinue }) => (
  <>
    <h2>Join with code:</h2>
    <p className="host-modal__code">{roomId}</p>
    <p
      className={`host-modal__info ${
        status === "waiting" ? "waiting" : "joined"
      }`}
    >
      {status === "waiting"
        ? "Waiting for a player to join..."
        : "A player has joined the game!"}
    </p>
    <button
      className="host-modal__continue"
      disabled={status === "waiting"}
      onClick={handleContinue}
    >
      Continue
    </button>
  </>
);

export default React.memo(ModalRoomInfo);
