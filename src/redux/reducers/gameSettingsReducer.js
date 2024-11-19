import {
  SET_ROUNDS,
  SET_TIME_LIMIT,
  SET_GAME_MODE,
  SET_GAME_TYPE,
  START_GAME,
} from "../constants/gameSettingsConstants";

const initialState = {
  gameType: "classic",
  rounds: 5,
  timeLimit: 120,
  gameMode: "Move",
  playerHealth: 6000,
};

export const gameSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.payload,
        ...(action.payload === "battle" ? { timeLimit: 0, rounds: 0 } : {}),
      };
    case SET_ROUNDS:
      return { ...state, rounds: action.payload };
    case SET_TIME_LIMIT:
      return { ...state, timeLimit: action.payload };
    case SET_GAME_MODE:
      return { ...state, gameMode: action.payload };
    case START_GAME:
      return state;
    default:
      return state;
  }
};
