const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    const userState = JSON.stringify(state.user);
    localStorage.setItem("userState", userState);
  } catch (error) {
    console.error("Error saving user state to localStorage:", error);
  }
  return result;
};

export default localStorageMiddleware;
