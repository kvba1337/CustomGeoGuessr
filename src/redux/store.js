import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";
import authMiddleware from "./middleware/authMiddleware";
import localStorageMiddleware from "./middleware/localStorageMiddleware";

const preloadedState = JSON.parse(localStorage.getItem("reduxState")) || {};

const createAppStore = async () => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          thunk,
          authMiddleware,
          localStorageMiddleware
        ),
      preloadedState,
    });

    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
