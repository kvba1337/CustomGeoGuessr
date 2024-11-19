import React from "react";
import "./ModalRoomInfo.scss";

const ModalRoomInfo = ({ roomId, status }) => (
  <>
    <div className="host-modal__header">
      <h2>Join with code:</h2>
      <p className="host-modal__code">{roomId}</p>
    </div>
    <div className="host-modal__info-container">
      <p
        className={`host-modal__info ${
          status === "waiting" ? "waiting" : "joined"
        }`}
      >
        {status === "waiting"
          ? "Waiting for a player to join..."
          : "A player has joined the game!"}
      </p>
    </div>
  </>
);

export default React.memo(ModalRoomInfo);
