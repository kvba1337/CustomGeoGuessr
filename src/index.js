import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>
);
