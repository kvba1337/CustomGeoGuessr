import { combineReducers } from "redux"
import { gameReducer } from "./gameReducer"
import { gameSettingsReducer } from "./gameSettingsReducer"
import { mapReducer } from "./mapReducer"
import { roomReducer } from "./roomReducer"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
  game: gameReducer,
  gameSettings: gameSettingsReducer,
  map: mapReducer,
  room: roomReducer,
  user: userReducer,
})
