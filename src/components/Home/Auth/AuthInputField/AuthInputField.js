import React from "react"
import "./AuthInputField.scss"

const AuthInputField = ({ type, placeholder, value, onChange, onKeyPress }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
)

export default React.memo(AuthInputField)
