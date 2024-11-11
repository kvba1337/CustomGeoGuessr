import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import DOMPurify from "dompurify";
import "../AuthModal/AuthModal.scss";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const clearError = () => {
    setError("");
  };

  const handleSignIn = async () => {
    if (!username) {
      setError("Username is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    setLoading(true);
    try {
      await dispatch(loginUser(sanitizedUsername, sanitizedPassword));
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="sign-in-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          clearError();
        }}
        onKeyPress={handleKeyPress}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearError();
        }}
        onKeyPress={handleKeyPress}
      />
      {error && <p className="error-message">{error}</p>}
      {loading && <div className="loading-spinner"></div>}
      {isAuthenticated && (
        <p className="success-message">Successfully logged in!</p>
      )}
      <button onClick={handleSignIn} disabled={loading}>
        Sign In
      </button>
    </div>
  );
};

export default SignInForm;
