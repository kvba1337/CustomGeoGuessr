import React from "react";
import "./MultiplayerButtons.scss";

const MultiplayerButtons = ({ onHostClick, onJoinClick }) => {
  return (
    <div className="buttons">
      <button className="button" onClick={onJoinClick}>
        JOIN
      </button>
      <button className="button" onClick={onHostClick}>
        HOST
      </button>
    </div>
  );
};

export default React.memo(MultiplayerButtons);
