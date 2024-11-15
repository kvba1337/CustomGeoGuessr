import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";
import authMiddleware from "./middleware/authMiddleware";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

const loadStateFromLocalStorage = () => {
  try {
    const serializedUserState = localStorage.getItem("userState");
    const serializedRoomState = localStorage.getItem("roomState");

    const userState = serializedUserState
      ? JSON.parse(serializedUserState)
      : undefined;
    const roomState = serializedRoomState
      ? JSON.parse(serializedRoomState)
      : undefined;

    return {
      user: userState,
      room: roomState,
    };
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

const preloadedState = loadStateFromLocalStorage();

const createAppStore = async () => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware, localStorageMiddleware),
      preloadedState,
    });

    return store;
  } catch (err) {
    throw new Error("Error creating store: ", err);
  }
};

export default createAppStore;
