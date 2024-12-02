import { useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@services/firebaseConfig";

const useFetchGameResults = (
  roomId,
  userId,
  setUserResults,
  setOpponentResults,
  setGameStatus
) => {
  useEffect(() => {
    const fetchGameResults = async () => {
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const usersSnapshot = await get(usersRef);
      const users = usersSnapshot.val();

      const opponentId = Object.keys(users).find((id) => id !== userId);

      const userResultsRef = ref(
        database,
        `rooms/${roomId}/users/${userId}/roundsResults`
      );
      const userResultsSnapshot = await get(userResultsRef);
      const userResultsData = userResultsSnapshot.val();

      const opponentResultsRef = ref(
        database,
        `rooms/${roomId}/users/${opponentId}/roundsResults`
      );
      const opponentResultsSnapshot = await get(opponentResultsRef);
      const opponentResultsData = opponentResultsSnapshot.val();

      setUserResults(Object.values(userResultsData || {}));
      setOpponentResults(Object.values(opponentResultsData || {}));

      const userTotalScore = Object.values(userResultsData || {}).reduce(
        (acc, round) => acc + round.score,
        0
      );
      const opponentTotalScore = Object.values(
        opponentResultsData || {}
      ).reduce((acc, round) => acc + round.score, 0);

      setGameStatus(
        userTotalScore > opponentTotalScore ? "YOU WON!" : "YOU LOST!"
      );
    };

    fetchGameResults();
  }, [roomId, userId, setUserResults, setOpponentResults, setGameStatus]);
};

export default useFetchGameResults;
