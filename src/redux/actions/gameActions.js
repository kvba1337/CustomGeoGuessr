import { database } from "@services/firebaseConfig"
import {
  calculateDamage,
  calculateDistance,
  calculateScore,
  formatDistance,
} from "@utils/gameUtils"
import { get, ref, update } from "firebase/database"
import {
  RESET_GAME_STATE,
  SET_CURRENT_LOCATION,
  SET_CURRENT_ROUND,
  SET_GAME_DATA,
  SET_GAME_STATUS,
  SET_MARKER_LOCATION,
  SET_RETURN_BUTTON_STATUS,
  SET_ROUND_RESULTS,
} from "../constants/gameConstants"

export const fetchGameData = (roomId) => async (dispatch) => {
  try {
    const roomRef = ref(database, `rooms/${roomId}`)
    const snapshot = await get(roomRef)
    const data = snapshot.val()

    dispatch({
      type: SET_GAME_DATA,
      payload: {
        gameLocations: data.gameLocations,
        selectedMap: data.selectedMap,
        settings: data.settings,
        users: data.users,
      },
    })
  } catch (error) {
    console.error("Error fetching game data:", error)
  }
}

export const setGameStatus = (status) => ({
  type: SET_GAME_STATUS,
  payload: status,
})

export const setCurrentLocation = (location) => ({
  type: SET_CURRENT_LOCATION,
  payload: location,
})

export const setCurrentRound = (round) => ({
  type: SET_CURRENT_ROUND,
  payload: round,
})

export const setMarkerLocation = (location) => ({
  type: SET_MARKER_LOCATION,
  payload: location,
})

export const setRoundResults = (results) => ({
  type: SET_ROUND_RESULTS,
  payload: results,
})

export const setReturnButtonStatus = (status) => ({
  type: SET_RETURN_BUTTON_STATUS,
  payload: status,
})

export const resetGameState = () => ({
  type: RESET_GAME_STATE,
})

export const roundOver = () => async (dispatch, getState) => {
  const { roomId } = getState().room
  const { userId } = getState().user
  const { markerLocation, gameLocations, currentRound, selectedMap, settings } =
    getState().game

  let userResult

  if (!markerLocation) {
    userResult = {
      guessedLocation: null,
      distanceToTarget: "Forgot to GUESS",
      score: 0,
    }
  } else {
    const targetLocation = gameLocations[currentRound - 1]
    const distanceToTarget = calculateDistance(markerLocation, targetLocation)
    const formattedDistance = formatDistance(distanceToTarget)
    const score = calculateScore(distanceToTarget, selectedMap.factor)

    userResult = {
      guessedLocation: markerLocation,
      distanceToTarget: formattedDistance,
      score,
    }
  }

  try {
    const usersRef = ref(database, `rooms/${roomId}/users`)
    const usersSnapshot = await get(usersRef)
    const users = usersSnapshot.val()
    const opponentId = Object.keys(users).find((id) => id !== userId)

    await update(
      ref(
        database,
        `rooms/${roomId}/users/${userId}/roundsResults/${currentRound - 1}`
      ),
      userResult
    )

    const opponentRef = ref(
      database,
      `rooms/${roomId}/users/${opponentId}/roundsResults/${currentRound - 1}`
    )
    const opponentSnapshot = await get(opponentRef)
    const opponentResult = opponentSnapshot.val()

    if (settings.gameType === "battle") {
      let userHp, opponentHp, userPrevHp, opponentPrevHp

      if (currentRound === 1) {
        userHp = 6000
        userPrevHp = userHp
        opponentHp = 6000
        opponentPrevHp = opponentHp
      } else {
        userHp = users[userId].roundsResults[currentRound - 2]?.remainingHp
        userPrevHp = userHp
        opponentHp =
          users[opponentId].roundsResults[currentRound - 2]?.remainingHp
        opponentPrevHp = opponentHp
      }

      if (userResult.score > opponentResult?.score) {
        const damage = calculateDamage(
          userResult.score,
          opponentResult.score,
          currentRound
        )
        opponentHp = Math.max(0, opponentHp - damage)
      } else if (opponentResult?.score > userResult.score) {
        const damage = calculateDamage(
          opponentResult.score,
          userResult.score,
          currentRound
        )
        userHp = Math.max(0, userHp - damage)
      }

      const updates = {
        [`rooms/${roomId}/users/${userId}/roundsResults/${
          currentRound - 1
        }/remainingHp`]: userHp,
        [`rooms/${roomId}/users/${opponentId}/roundsResults/${
          currentRound - 1
        }/remainingHp`]: opponentHp,
      }

      await update(ref(database), updates)

      userResult.remainingHp = userHp
      userResult.prevHp = userPrevHp
      opponentResult.remainingHp = opponentHp
      opponentResult.prevHp = opponentPrevHp
    }

    dispatch(setRoundResults({ userResult, opponentResult }))
    dispatch(setGameStatus("roundOver"))
  } catch (error) {
    console.error("Error in roundOver:", error)
  }
}

export const handleNextRound = () => async (dispatch, getState) => {
  const { currentRound, totalRounds, gameLocations, settings } = getState().game
  const { roomId } = getState().room
  const usersRef = ref(database, `rooms/${roomId}/users`)
  const usersSnapshot = await get(usersRef)
  const users = usersSnapshot.val()

  const updates = {}
  Object.keys(users).forEach((userId) => {
    updates[`rooms/${roomId}/users/${userId}/hasGuessed`] = false
  })
  await update(ref(database), updates)

  await dispatch(setCurrentRound(currentRound + 1))
  dispatch(setCurrentLocation(gameLocations[currentRound]))
  dispatch(setMarkerLocation(null))

  if (settings.gameType === "battle") {
    const userId = Object.keys(users)[0]
    const opponentId = Object.keys(users)[1]

    const userHp = users[userId].roundsResults[currentRound - 1]?.remainingHp
    const opponentHp =
      users[opponentId].roundsResults[currentRound - 1]?.remainingHp

    if (userHp === 0 || opponentHp === 0 || currentRound === 10) {
      await dispatch(setGameStatus("gameOver"))
      const updates = {}
      Object.keys(users).forEach((userId) => {
        updates[`rooms/${roomId}/users/${userId}/isCurrent`] = false
      })
      await update(ref(database), updates)
    } else {
      await dispatch(setGameStatus("beforeRound"))
    }
  } else {
    if (currentRound < totalRounds) {
      await dispatch(setGameStatus("beforeRound"))
    } else {
      await dispatch(setGameStatus("gameOver"))
      const updates = {}
      Object.keys(users).forEach((userId) => {
        updates[`rooms/${roomId}/users/${userId}/isCurrent`] = false
      })
      await update(ref(database), updates)
    }
  }
}

export const resetGame = (roomId) => async (dispatch) => {
  try {
    const roomRef = ref(database, `rooms/${roomId}`)
    await update(roomRef, {
      gameStatus: "waiting",
      gameLocations: null,
      selectedMap: null,
      settings: null,
    })

    const usersRef = ref(database, `rooms/${roomId}/users`)
    const usersSnapshot = await get(usersRef)
    const users = usersSnapshot.val()

    const updates = {}
    Object.keys(users).forEach((userId) => {
      updates[`rooms/${roomId}/users/${userId}/roundsResults`] = null
      updates[`rooms/${roomId}/users/${userId}/hasGuessed`] = false
    })

    await update(ref(database), updates)

    dispatch(setGameStatus("waiting"))
    dispatch(resetGameState())
  } catch (error) {
    console.error("Error resetting game:", error)
  }
}
