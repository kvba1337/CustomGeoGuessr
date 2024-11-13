import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";
import authMiddleware from "./middleware/authMiddleware";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined;
    }
    return { user: JSON.parse(serializedState) };
  } catch (error) {
    console.error("Error loading user state from localStorage:", error);
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
