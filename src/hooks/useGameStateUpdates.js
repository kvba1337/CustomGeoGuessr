import { roundOver, setCurrentLocation } from "@redux/actions/gameActions"
import { database } from "@services/firebaseConfig"
import { onValue, ref } from "firebase/database"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGameStateUpdates = () => {
  const dispatch = useDispatch()
  const { status, gameLocations, currentRound } = useSelector(
    (state) => state.game
  )
  const { roomId } = useSelector((state) => state.room)

  const handleRoundLive = useCallback(() => {
    if (status === "roundLive") {
      dispatch(setCurrentLocation(gameLocations[currentRound - 1]))
    }
  }, [status, currentRound, gameLocations, dispatch])

  const handleRoomUpdates = useCallback(() => {
    if (roomId) {
      const usersRef = ref(database, `rooms/${roomId}/users`)
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const users = snapshot.val()
        if (users && Object.values(users).every((user) => user.hasGuessed)) {
          dispatch(roundOver())
        }
      })

      return () => unsubscribe()
    }
  }, [roomId, dispatch])

  useEffect(() => {
    handleRoundLive()
  }, [handleRoundLive])

  useEffect(() => {
    handleRoomUpdates()
  }, [handleRoomUpdates])
}

export default useGameStateUpdates
