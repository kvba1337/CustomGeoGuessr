import React from "react";
import { useSelector } from "react-redux";
import "./ModalPlayersInfo.scss";

const ModalPlayersInfo = ({ status }) => {
  const { avatar, username } = useSelector((state) => state.user);
  const { opponent } = useSelector((state) => state.room);

  return (
    <div className="modal-players">
      <div className="player">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <span className="username">{username}</span>
      </div>
      <div className="vs">VS</div>
      <div className="player">
        {status !== "waiting" ? (
          <>
            <img
              src={opponent.avatar}
              alt="Opponent Avatar"
              className="avatar"
            />
            <span className="username">{opponent.username}</span>
          </>
        ) : (
          <>
            <div className="avatar question-mark">
              <i className="fas fa-question"></i>
            </div>
            <span className="username">???</span>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ModalPlayersInfo);
