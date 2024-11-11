import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  deleteRoom,
  leaveRoom,
  fetchOpponentData,
} from "../../redux/actions/roomActions";
import { ref, onValue, update } from "firebase/database";
import { database } from "../../firebaseConfig";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton";
import "./HostModal.scss";

const HostModal = ({ onClose }) => {
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

  const handleLeave = () => {
    if (roomId && userId && joinedRoomError) {
      dispatch(leaveRoom(roomId, userId));
    } else if (roomId && userId) {
      dispatch(deleteRoom(roomId));
    }
    onClose();
  };

  const handleContinue = () => {
    if (roomId) {
      const roomRef = ref(database, `rooms/${roomId}`);
      update(roomRef, { gameStatus: "choosingGameSettings" });
      navigate("/select-map");
    }
  };

  return (
    <div className="host-modal-overlay">
      <div className="host-modal">
        <ModalCloseButton onClick={onClose} />
        <>
          {joinedRoomError ? (
            <p className="host-modal__message error">
              You are currently in the room. <br />
              Leave the room to host.
            </p>
          ) : (
            <>
              <h2>Join with code:</h2>
              <p className="host-modal__code">{roomId}</p>
              <p
                className={`host-modal__info ${
                  status === "waiting" ? "waiting" : "joined"
                }`}
              >
                {status === "waiting"
                  ? "Waiting for a player to join..."
                  : "A player has joined the game!"}
              </p>
              <button
                className="host-modal__continue"
                disabled={status === "waiting"}
                onClick={handleContinue}
              >
                Continue
              </button>
            </>
          )}
        </>
        <button className="host-modal__leave" onClick={handleLeave}>
          Leave
        </button>
      </div>
    </div>
  );
};

export default HostModal;
