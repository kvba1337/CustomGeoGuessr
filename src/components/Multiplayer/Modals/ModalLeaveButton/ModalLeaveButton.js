import React from "react";
import "./ModalLeaveButton.scss";

const ModalLeaveButton = ({ handleLeave }) => (
  <button className="host-modal__leave" onClick={handleLeave}>
    Leave
  </button>
);

export default React.memo(ModalLeaveButton);
