import React from "react";
import "./ModalLeaveButton.scss";

const ModalLeaveButton = ({ handleLeave }) => (
  <div className="leave-button-container">
    <button className="leave-button" onClick={handleLeave}>
      Leave
    </button>
  </div>
);

export default React.memo(ModalLeaveButton);
