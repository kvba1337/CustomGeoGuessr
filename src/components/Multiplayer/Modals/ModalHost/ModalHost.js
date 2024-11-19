import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue, update } from "firebase/database";

import {
  createRoom,
  deleteRoom,
  leaveRoom,
  fetchOpponentData,
} from "@redux/actions/roomActions";
import { database } from "@services/firebaseConfig";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton";
import ModalErrorMessage from "../ModalErrorMessage/ModalErrorMessage";
import ModalRoomInfo from "../ModalRoomInfo/ModalRoomInfo";
import ModalLeaveButton from "../ModalLeaveButton/ModalLeaveButton";
import "./ModalHost.scss";

const ModalHost = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [joinedRoomError, setJoinedRoomError] = useState(false);
  const [checkedJoinedRoom, setCheckedJoinedRoom] = useState(false);
  const { roomId, status } = useSelector((state) => state.room);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    const joinedRoom = sessionStorage.getItem("joinedRoomId");
    if (joinedRoom) {
      setJoinedRoomError(true);
    }
    setCheckedJoinedRoom(true);
  }, []);

  useEffect(() => {
    if (checkedJoinedRoom && !joinedRoomError && userId) {
      const hostedRoomId = sessionStorage.getItem("hostedRoomId");
      if (hostedRoomId) {
        dispatch({ type: "CREATE_ROOM_SUCCESS", payload: hostedRoomId });
        dispatch({ type: "SET_ROOM_ID", payload: hostedRoomId });
        dispatch({ type: "SET_ROOM_STATUS", payload: "waiting" });
      } else {
        dispatch(createRoom(userId));
      }
    }
  }, [dispatch, userId, joinedRoomError, checkedJoinedRoom]);

  useEffect(() => {
    if (roomId) {
      const roomRef = ref(database, `rooms/${roomId}/users`);
      const unsubscribe = onValue(roomRef, (snapshot) => {
        const users = snapshot.val();
        if (
          users &&
          Object.values(users).some(
            (user) => user.isCurrent && user.userId !== userId
          )
        ) {
          dispatch({ type: "SET_ROOM_STATUS", payload: "joined" });
          dispatch(fetchOpponentData(roomId, userId));
        } else {
          dispatch({ type: "SET_ROOM_STATUS", payload: "waiting" });
        }
      });

      return () => unsubscribe();
    }
  }, [dispatch, roomId, userId]);

  const handleLeave = useCallback(() => {
    if (roomId && userId && joinedRoomError) {
      dispatch(leaveRoom(roomId, userId));
    } else if (roomId && userId) {
      dispatch(deleteRoom(roomId));
    }
    onClose();
  }, [dispatch, roomId, userId, joinedRoomError, onClose]);

  const handleContinue = useCallback(() => {
    if (roomId) {
      const roomRef = ref(database, `rooms/${roomId}`);
      update(roomRef, { gameStatus: "choosingGameSettings" });
      navigate("/select-map");
    }
  }, [roomId, navigate]);

  return (
    <div className="host-modal-overlay">
      <div className="host-modal">
        <ModalCloseButton onClick={onClose} />
        <div className="host-modal__body">
          {joinedRoomError ? (
            <>
              <ModalErrorMessage />
              <ModalLeaveButton handleLeave={handleLeave} />
            </>
          ) : (
            <>
              <ModalRoomInfo roomId={roomId} status={status} />
              <div className="host-modal__buttons">
                <div className="host-modal__continue-container">
                  <button
                    className="host-modal__continue"
                    disabled={status === "waiting"}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
                <ModalLeaveButton handleLeave={handleLeave} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModalHost);
