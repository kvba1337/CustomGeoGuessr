import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "@services/firebaseConfig";
import { setCurrentLocation, roundOver } from "@redux/actions/gameActions";

const useGameStateUpdates = () => {
  const dispatch = useDispatch();
  const { status, gameLocations, currentRound } = useSelector(
    (state) => state.game
  );
  const { roomId } = useSelector((state) => state.room);

  const handleRoundLive = useCallback(() => {
    if (status === "roundLive") {
      dispatch(setCurrentLocation(gameLocations[currentRound - 1]));
    }
  }, [status, currentRound, gameLocations, dispatch]);

  const handleRoomUpdates = useCallback(() => {
    if (roomId) {
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        if (users && Object.values(users).every((user) => user.hasGuessed)) {
          dispatch(roundOver());
        }
      });

      return () => unsubscribe();
    }
  }, [roomId, dispatch]);

  useEffect(() => {
    handleRoundLive();
  }, [handleRoundLive]);

  useEffect(() => {
    handleRoomUpdates();
  }, [handleRoomUpdates]);
};

export default useGameStateUpdates;
