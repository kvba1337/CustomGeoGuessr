import { ref, update } from "firebase/database";

import { database } from "@services/firebaseConfig";
import {
  SET_ROUNDS,
  SET_TIME_LIMIT,
  SET_GAME_MODE,
  START_GAME,
} from "../constants/gameSettingsConstants";

export const setRounds = (rounds) => ({
  type: SET_ROUNDS,
  payload: rounds,
});

export const setTimeLimit = (timeLimit) => ({
  type: SET_TIME_LIMIT,
  payload: timeLimit,
});

export const setGameMode = (gameMode) => ({
  type: SET_GAME_MODE,
  payload: gameMode,
});

export const startGame = (roomId, settings) => async (dispatch, getState) => {
  try {
    const { mapData } = getState().map;
    const { rounds } = settings;

    const shuffledLocations = [...mapData.locationsList].sort(
      () => 0.5 - Math.random()
    );
    const selectedLocations = shuffledLocations.slice(0, rounds);

    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, {
      settings,
      gameStatus: "gameStarted",
      gameLocations: selectedLocations,
    });

    dispatch({ type: START_GAME });
  } catch (error) {
    console.error("Error starting game:", error);
  }
};
