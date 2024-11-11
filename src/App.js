import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { logoutUser } from "./redux/actions/userActions";
import Home from "./pages/Home/Home";
import MapSelection from "./pages/MapSelection/MapSelection";
import GameSettings from "./pages/GameSettings/GameSettings";
import Game from "./pages/Game/Game";
import Multiplayer from "./pages/Multiplayer/Multiplayer";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          dispatch({
            type: "SET_AUTHENTICATED",
            payload: true,
          });
        });
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/select-map"
        element={
          <ProtectedRoute>
            <MapSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game-settings"
        element={
          <ProtectedRoute>
            <GameSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        }
      />
      <Route
        path="/multiplayer"
        element={
          <ProtectedRoute>
            <Multiplayer />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
