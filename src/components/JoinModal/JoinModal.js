import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  joinRoom,
  leaveRoom,
  clearRoomError,
} from "../../redux/actions/roomActions";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../firebaseConfig";
import { deleteRoom } from "../../redux/actions/roomActions";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton";
import "./JoinModal.scss";

const JoinModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputRoomId, setInputRoomId] = useState("");
  const [hostedRoomError, setHostedRoomError] = useState(false);
  const { roomId, status, error } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    const joinedRoomId = sessionStorage.getItem("joinedRoomId");
    if (joinedRoomId) {
      dispatch({ type: "JOIN_ROOM_SUCCESS", payload: joinedRoomId });
      dispatch({ type: "SET_ROOM_ID", payload: joinedRoomId });
      dispatch({ type: "SET_ROOM_STATUS", payload: "joined" });

      const userRef = ref(database, `rooms/${joinedRoomId}/users/${userId}`);
      update(userRef, { isCurrent: true });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (inputRoomId) {
      dispatch(clearRoomError());
    }
  }, [inputRoomId, dispatch]);

  useEffect(() => {
    if (roomId) {
      const roomRef = ref(database, `rooms/${roomId}`);
      const unsubscribe = onValue(roomRef, (snapshot) => {
        if (!snapshot.exists()) {
          dispatch({ type: "LEAVE_ROOM_SUCCESS" });
          sessionStorage.removeItem("joinedRoomId");
          onClose();
        } else {
          const roomData = snapshot.val();
          if (roomData.gameStatus === "choosingGameSettings") {
            dispatch({
              type: "SET_ROOM_STATUS",
              payload: "choosingGameSettings",
            });
          } else if (roomData.gameStatus === "gameStarted") {
            navigate("/game");
          }
        }
      });

      return () => unsubscribe();
    }
  }, [dispatch, roomId, onClose, navigate]);

  useEffect(() => {
    const hostedRoom = sessionStorage.getItem("hostedRoomId");
    if (hostedRoom) {
      setHostedRoomError(true);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (roomId && userId) {
        const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
        await update(userRef, { isCurrent: false });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomId, userId]);

  const handleJoin = () => {
    if (inputRoomId && userId) {
      dispatch(joinRoom(inputRoomId, userId));
    }
  };

  const handleLeave = () => {
    if (roomId && userId && hostedRoomError) {
      dispatch(deleteRoom(roomId));
    } else if (roomId && userId) {
      dispatch(leaveRoom(roomId, userId));
    }
  };

  const handleClose = async () => {
    if (roomId && userId) {
      const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
      await update(userRef, { isCurrent: false });
    }
    onClose();
    dispatch(clearRoomError());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <div className="join-modal-overlay">
      <div className="join-modal">
        {!roomId ? (
          <>
            <ModalCloseButton onClick={handleClose} />
            <h2>Enter the code to join:</h2>
            <input
              type="text"
              className="join-modal__input"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              maxLength="4"
              disabled={!!roomId}
            />
            <button
              className={`join-modal__join ${roomId ? "disabled" : ""}`}
              onClick={handleJoin}
              disabled={!!roomId}
            >
              Join
            </button>
          </>
        ) : (
          <>
            {status === "choosingGameSettings" ? (
              <p className="join-modal__message success">
                Host is choosing game settings... <br />
                Game starts soon
              </p>
            ) : (
              <>
                <ModalCloseButton onClick={handleClose} />

                {hostedRoomError ? (
                  <p className="join-modal__message error">
                    You are currently a host. <br></br>
                    Leave the room to join another.
                  </p>
                ) : (
                  <p className="join-modal__message success">
                    Successfully connected to the room:
                    <br />
                    <span>{roomId}</span>
                  </p>
                )}
                <button className="join-modal__leave" onClick={handleLeave}>
                  Leave
                </button>
              </>
            )}
          </>
        )}

        {error && (
          <p className="join-modal__message error">
            Failed to connect to the room:
            <br />
            <span>{inputRoomId}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinModal;
