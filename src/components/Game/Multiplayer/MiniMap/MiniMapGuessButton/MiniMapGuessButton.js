import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { ref, update } from "firebase/database";

import { database } from "@services/firebaseConfig";
import "./MiniMapGuessButton.scss";

const MiniMapGuessButton = ({ onClick, disabled, hasMarker }) => {
  const { roomId } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);

  const handleClick = useCallback(() => {
    if (!disabled && hasMarker) {
      onClick();
      update(ref(database, `rooms/${roomId}/users/${userId}`), {
        hasGuessed: true,
      });
    }
  }, [disabled, hasMarker, onClick, roomId, userId]);

  return (
    <button
      className={`submit-guess-btn ${disabled || !hasMarker ? "disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? "GUESS" : hasMarker ? "GUESS" : "PLACE YOUR PIN ON THE MAP"}
    </button>
  );
};

export default React.memo(MiniMapGuessButton);
