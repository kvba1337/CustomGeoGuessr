import {
  SET_ROUNDS,
  SET_TIME_LIMIT,
  SET_GAME_MODE,
  START_GAME,
} from "../constants/gameSettingsConstants";

const initialState = {
  rounds: 5,
  timeLimit: 60,
  gameMode: "Move",
};

export const gameSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
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
