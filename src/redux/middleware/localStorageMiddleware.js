const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
  return result;
};

export default localStorageMiddleware;
