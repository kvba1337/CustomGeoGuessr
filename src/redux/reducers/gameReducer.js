import {
  SET_GAME_DATA,
  SET_GAME_STATUS,
  SET_CURRENT_LOCATION,
  SET_CURRENT_ROUND,
  SET_MARKER_LOCATION,
  SET_ROUND_RESULTS,
  SET_RETURN_BUTTON_STATUS,
  RESET_GAME_STATE,
} from "../constants/gameConstants";

const initialState = {
  gameLocations: [],
  selectedMap: null,
  settings: null,
  users: [],
  status: "beforeRound", 
  currentLocation: null,
  currentRound: 1,
  totalRounds: 5,
  guesses: {},
  roundResults: {
    userResult: null,
    opponentResult: null,
  },
  returnButtonStatus: "idle",
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_DATA:
      return {
        ...state,
        gameLocations: action.payload.gameLocations,
        selectedMap: action.payload.selectedMap,
        settings: action.payload.settings,
        users: action.payload.users,
        totalRounds: action.payload.settings.rounds,
      };
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case SET_CURRENT_ROUND:
      return {
        ...state,
        currentRound: action.payload,
      };
    case SET_MARKER_LOCATION:
      return {
        ...state,
        markerLocation: action.payload,
      };
    case SET_ROUND_RESULTS:
      return {
        ...state,
        roundResults: action.payload,
      };
    case SET_RETURN_BUTTON_STATUS:
      return {
        ...state,
        returnButtonStatus: action.payload,
      };
    case RESET_GAME_STATE:
      return initialState;
    default:
      return state;
  }
};
