import React from "react"
import "./ModalCloseButton.scss"

const ModalCloseButton = ({ onClick }) => {
  return (
    <button className="close-button" onClick={onClick}>
      &times;
    </button>
  )
}

export default ModalCloseButton
