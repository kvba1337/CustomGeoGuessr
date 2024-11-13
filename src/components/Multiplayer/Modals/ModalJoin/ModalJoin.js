import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";

import {
  joinRoom,
  leaveRoom,
  clearRoomError,
  deleteRoom,
} from "@redux/actions/roomActions";
import { database } from "@services/firebaseConfig";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton";
import ModalErrorMessage from "../ModalErrorMessage/ModalErrorMessage";
import ModalLeaveButton from "../ModalLeaveButton/ModalLeaveButton";
import "./ModalJoin.scss";

const ModalJoin = ({ onClose }) => {
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

  const handleJoin = useCallback(() => {
    if (inputRoomId && userId) {
      dispatch(joinRoom(inputRoomId, userId));
    }
  }, [dispatch, inputRoomId, userId]);

  const handleLeave = useCallback(() => {
    if (roomId && userId && hostedRoomError) {
      dispatch(deleteRoom(roomId));
    } else if (roomId && userId) {
      dispatch(leaveRoom(roomId, userId));
    }
  }, [dispatch, roomId, userId, hostedRoomError]);

  const handleClose = useCallback(async () => {
    if (roomId && userId) {
      const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
      await update(userRef, { isCurrent: false });
    }
    onClose();
    dispatch(clearRoomError());
  }, [dispatch, roomId, userId, onClose]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleJoin();
      }
    },
    [handleJoin]
  );

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
              placeholder="XYZA"
              disabled={!!roomId}
            />
            <button
              className={`join-modal__join ${!inputRoomId ? "disabled" : ""}`}
              onClick={handleJoin}
              disabled={!inputRoomId || !!roomId}
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
                  <ModalErrorMessage />
                ) : (
                  <p className="join-modal__message success">
                    Successfully connected to the room:
                    <br />
                    <span>{roomId}</span>
                  </p>
                )}
                <ModalLeaveButton handleLeave={handleLeave} />
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

export default React.memo(ModalJoin);
