import useAuth from "@hooks/useAuth"
import GamePage from "@pages/GamePage/GamePage"
import GameSettingsPage from "@pages/GameSettingsPage/GameSettingsPage"
import HomePage from "@pages/HomePage/HomePage"
import MapSelectionPage from "@pages/MapSelectionPage/MapSelectionPage"
import MultiplayerPage from "@pages/MultiplayerPage/MultiplayerPage"
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage"
import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"

const App = React.memo(() => {
  useAuth()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const ProtectedRoute = useCallback(
    ({ children }) => {
      return isAuthenticated ? children : <Navigate to="/" />
    },
    [isAuthenticated]
  )

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/select-map"
        element={
          <ProtectedRoute>
            <MapSelectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game-settings"
        element={
          <ProtectedRoute>
            <GameSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/multiplayer"
        element={
          <ProtectedRoute>
            <MultiplayerPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
})

App.displayName = "App"

export default App
