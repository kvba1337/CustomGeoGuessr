const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    const userState = JSON.stringify(state.user);
    localStorage.setItem("userState", userState);

    const roomState = JSON.stringify(state.room);
    localStorage.setItem("roomState", roomState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
  return result;
};

export default localStorageMiddleware;
