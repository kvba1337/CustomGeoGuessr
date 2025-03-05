import React from "react"
import "./ModalLeaveButton.scss"

const ModalLeaveButton = ({ handleLeave }) => (
  <button className="button button-danger button-lg" onClick={handleLeave}>
    <div className="button-wrapper">
      <span className="button-label">Leave</span>
    </div>
  </button>
)

export default React.memo(ModalLeaveButton)
