import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { roomReducer } from "./roomReducer";
import { mapReducer } from "./mapReducer";
import { gameSettingsReducer } from "./gameSettingsReducer";
import { gameReducer } from "./gameReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  map: mapReducer,
  gameSettings: gameSettingsReducer,
  game: gameReducer,
});
