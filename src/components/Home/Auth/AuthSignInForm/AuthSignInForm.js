import { loginExistingUser } from "@redux/actions/userActions"
import { validatePassword, validateUsername } from "@utils/authUtils"
import DOMPurify from "dompurify"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthInputField from "../AuthInputField/AuthInputField"
import "../AuthModal/AuthModal.scss"

const AuthSignInForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const clearError = useCallback(() => {
    setError("")
  }, [])

  const handleSignIn = useCallback(async () => {
    const usernameError = validateUsername(username)
    const passwordError = validatePassword(password)

    if (usernameError || passwordError) {
      setError(usernameError || passwordError)
      return
    }

    const sanitizedUsername = DOMPurify.sanitize(username)
    const sanitizedPassword = DOMPurify.sanitize(password)

    setLoading(true)
    try {
      await dispatch(loginExistingUser(sanitizedUsername, sanitizedPassword))
    } catch (err) {
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }, [dispatch, username, password])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSignIn()
      }
    },
    [handleSignIn]
  )

  return (
    <div className="sign-in-form">
      <AuthInputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          clearError()
        }}
        onKeyPress={handleKeyPress}
      />
      <AuthInputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          clearError()
        }}
        onKeyPress={handleKeyPress}
      />
      {error && <p className="error-message animation-shake">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <div className="success-message animation-slideIn">
          Successfully registered!
        </div>
      )}
      <button
        className="button button-primary button-lg"
        onClick={handleSignIn}
        disabled={loading}
      >
        <div className="button-wrapper">
          <span className="button-label">Sign In</span>
        </div>
      </button>
    </div>
  )
}

export default React.memo(AuthSignInForm)
