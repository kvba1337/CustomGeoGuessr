import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import createAppStore from "@redux/store";
import App from "./App";

const AppContainer = React.memo(() => {
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
      } catch (err) {
        setError(err);
        console.error("Error initializing store:", err);
      }
    };

    initializeStore();
  }, []);

  if (error) {
    return <div>Error loading application. Please try again later.</div>;
  }

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});

export default AppContainer;
