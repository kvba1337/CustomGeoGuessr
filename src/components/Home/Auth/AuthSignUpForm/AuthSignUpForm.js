import { registerNewUser } from "@redux/actions/userActions"
import { validatePassword, validateUsername } from "@utils/authUtils"
import DOMPurify from "dompurify"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthAvatarOptions from "../AuthAvatarOptions/AuthAvatarOptions"
import AuthInputField from "../AuthInputField/AuthInputField"
import AuthSelectedAvatar from "../AuthSelectedAvatar/AuthSelectedAvatar"
import "../AuthModal/AuthModal.scss"

const AuthSignUpForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const clearError = useCallback(() => {
    setError("")
  }, [])

  const handleAvatarClick = useCallback(
    (avatar) => {
      setSelectedAvatar(avatar)
      clearError()
    },
    [clearError]
  )

  const handleSignUp = useCallback(async () => {
    const usernameError = validateUsername(username)
    const passwordError = validatePassword(password)

    if (usernameError || passwordError) {
      setError(usernameError || passwordError)
      return
    }

    if (!selectedAvatar) {
      setError("Avatar is required")
      return
    }

    const sanitizedUsername = DOMPurify.sanitize(username)
    const sanitizedPassword = DOMPurify.sanitize(password)

    setLoading(true)
    try {
      await dispatch(
        registerNewUser(sanitizedUsername, sanitizedPassword, selectedAvatar)
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dispatch, username, password, selectedAvatar])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSignUp()
      }
    },
    [handleSignUp]
  )

  return (
    <div className="sign-up-form">
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
      <AuthAvatarOptions
        selectedAvatar={selectedAvatar}
        handleAvatarClick={handleAvatarClick}
      />
      {selectedAvatar && <AuthSelectedAvatar selectedAvatar={selectedAvatar} />}
      {error && <p className="error-message animation-shake">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <div className="success-message animation-slideIn">
          Successfully registered!
        </div>
      )}
      <button
        className="button button-primary button-lg"
        onClick={handleSignUp}
        disabled={loading}
      >
        <div className="button-wrapper">
          <span className="button-label">Sign Up</span>
        </div>
      </button>
    </div>
  )
}

export default React.memo(AuthSignUpForm)
