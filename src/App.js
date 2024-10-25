import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapSelection from "./pages/MapSelection/MapSelection";
import GameSettings from "./pages/GameSettings/GameSettings";
import Game from "./pages/Game/Game";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-map" element={<MapSelection />} />
        <Route path="/game-settings" element={<GameSettings />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
