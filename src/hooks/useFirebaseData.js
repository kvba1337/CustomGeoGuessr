import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGameData } from "../redux/actions/gameActions";
import { fetchOpponentData } from "../redux/actions/roomActions";

const useFirebaseData = (roomId, userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) {
      dispatch(fetchGameData(roomId));
      dispatch(fetchOpponentData(roomId, userId));
    }
  }, [dispatch, roomId, userId]);
};

export default useFirebaseData;
