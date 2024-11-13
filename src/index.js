import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppContainer from "./AppContainer";
import "./index.css";

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
  );
} catch (error) {
  console.error("Error during application rendering:", error);
}
