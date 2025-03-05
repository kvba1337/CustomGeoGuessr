import { signInAsGuest } from "@redux/actions/userActions"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthAvatarOptions from "../AuthAvatarOptions/AuthAvatarOptions"
import AuthSelectedAvatar from "../AuthSelectedAvatar/AuthSelectedAvatar"
import "../AuthModal/AuthModal.scss"
import "./AuthGuestForm.scss"

const AuthGuestForm = () => {
  const dispatch = useDispatch()
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

  const handleContinue = useCallback(async () => {
    if (!selectedAvatar) {
      setError("Avatar is required")
      return
    }

    setLoading(true)
    try {
      await dispatch(signInAsGuest(selectedAvatar))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dispatch, selectedAvatar])

  return (
    <div className="guest-form">
      <p className="select-avatar-info">Select an avatar</p>
      <AuthAvatarOptions
        selectedAvatar={selectedAvatar}
        handleAvatarClick={handleAvatarClick}
      />
      {selectedAvatar && <AuthSelectedAvatar selectedAvatar={selectedAvatar} />}
      {error && <p className="error-message animation-shake">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <div className="success-message animation-slideIn">
          Successfully signed in as guest!
        </div>
      )}
      <button
        className="button button-primary button-lg"
        onClick={handleContinue}
        disabled={loading}
      >
        <div className="button-wrapper">
          <span className="button-label">Continue</span>
        </div>
      </button>
    </div>
  )
}

export default React.memo(AuthGuestForm)
