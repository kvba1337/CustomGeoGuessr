import React from "react"
import "./ModalErrorMessage.scss"

const ErrorMessage = () => (
  <p className="error-message">
    You are currently in the room. <br />
    Leave the room to host.
  </p>
)

export default React.memo(ErrorMessage)
