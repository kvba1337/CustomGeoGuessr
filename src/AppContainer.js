import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import createAppStore from "./redux/store";
import App from "./App";

const AppContainer = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initializeStore = async () => {
      const appStore = await createAppStore();
      setStore(appStore);
    };

    initializeStore();
  }, []);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
