import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAsGuest } from "../../redux/actions/userActions";
import "../AuthModal/AuthModal.scss";
import avatar1 from "../../assets/images/avatars/avatar1.png";
import avatar2 from "../../assets/images/avatars/avatar2.png";
import avatar3 from "../../assets/images/avatars/avatar3.png";
import avatar4 from "../../assets/images/avatars/avatar4.png";
import avatar5 from "../../assets/images/avatars/avatar5.png";
import avatar6 from "../../assets/images/avatars/avatar6.png";
import avatar7 from "../../assets/images/avatars/avatar7.png";
import avatar8 from "../../assets/images/avatars/avatar8.png";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

const GuestForm = () => {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const clearError = () => {
    setError("");
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    clearError();
  };

  const handleContinue = async () => {
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
  };

  return (
    <div className="guest-form">
      <div className="avatar-options">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`avatar-option ${
              selectedAvatar === avatar ? "selected" : ""
            }`}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      {selectedAvatar && (
        <div className="selected-avatar">
          <img src={selectedAvatar} alt="Selected Avatar" />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <p className="success-message">Successfully signed in as guest!</p>
      )}
      <button onClick={handleContinue} disabled={loading}>
        Continue
      </button>
    </div>
  );
};

export default GuestForm;
