import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInAsGuest } from "@redux/actions/userActions";
import AuthAvatarOptions from "../AuthAvatarOptions/AuthAvatarOptions";
import AuthSelectedAvatar from "../AuthSelectedAvatar/AuthSelectedAvatar";
import "../AuthModal/AuthModal.scss";

const AuthGuestForm = () => {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const handleAvatarClick = useCallback(
    (avatar) => {
      setSelectedAvatar(avatar);
      clearError();
    },
    [clearError]
  );

  const handleContinue = useCallback(async () => {
    if (!selectedAvatar) {
      setError("Avatar is required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(signInAsGuest(selectedAvatar));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedAvatar]);

  return (
    <div className="guest-form">
      <AuthAvatarOptions
        selectedAvatar={selectedAvatar}
        handleAvatarClick={handleAvatarClick}
      />
      {selectedAvatar && <AuthSelectedAvatar selectedAvatar={selectedAvatar} />}
      {error && <p className="error-message">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <div className="success-message">Successfully signed in as guest!</div>
      )}
      <button onClick={handleContinue} disabled={loading}>
        Continue
      </button>
    </div>
  );
};

export default React.memo(AuthGuestForm);
