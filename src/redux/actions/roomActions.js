import { database } from "@services/firebaseConfig"
import { child, get, onDisconnect, ref, remove, set } from "firebase/database"
import {
  CLEAR_ROOM_ERROR,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  LEAVE_ROOM_FAIL,
  LEAVE_ROOM_REQUEST,
  LEAVE_ROOM_SUCCESS,
  SET_OPPONENT_DATA,
  SET_ROOM_ID,
  SET_ROOM_STATUS,
} from "../constants/roomConstants"

export const setOpponentData = (opponentData) => ({
  type: SET_OPPONENT_DATA,
  payload: opponentData,
})

export const fetchOpponentData = (roomId, userId) => async (dispatch) => {
  try {
    const usersRef = ref(database, `rooms/${roomId}/users`)
    const snapshot = await get(usersRef)

    if (snapshot.exists()) {
      const users = snapshot.val()
      const opponentId = Object.keys(users).find((id) => id !== userId)

      if (opponentId) {
        const opponentRef = ref(database, `users/${opponentId}`)
        const opponentSnapshot = await get(opponentRef)

        if (opponentSnapshot.exists()) {
          const opponentData = opponentSnapshot.val()
          const { avatar, username } = opponentData
          dispatch(setOpponentData({ avatar, username }))
        }
      }
    }
  } catch (error) {
    console.error("Error fetching opponent data:", error)
  }
}

export const createRoom = (userId) => async (dispatch) => {
  dispatch({ type: CREATE_ROOM_REQUEST })

  try {
    const roomId = Math.random().toString(36).substr(2, 4).toUpperCase()
    const roomRef = ref(database, `rooms/${roomId}`)
    await set(roomRef, {
      roomId,
      users: {
        [userId]: { isCurrent: true, userId },
      },
    })

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("hostedRoomId")
    })

    onDisconnect(roomRef).remove()

    sessionStorage.setItem("hostedRoomId", roomId)
    dispatch({ type: CREATE_ROOM_SUCCESS, payload: roomId })
    dispatch({ type: SET_ROOM_ID, payload: roomId })
    dispatch({ type: SET_ROOM_STATUS, payload: "waiting" })
  } catch (error) {
    dispatch({ type: CREATE_ROOM_FAIL, payload: error.message })
    console.error("Error creating room:", error)
  }
}

export const joinRoom = (roomId, userId) => async (dispatch) => {
  dispatch({ type: JOIN_ROOM_REQUEST })

  try {
    const roomRef = ref(database, `rooms/${roomId}`)
    const roomSnapshot = await get(child(roomRef, "/"))

    if (roomSnapshot.exists()) {
      await set(ref(database, `rooms/${roomId}/users/${userId}`), {
        isCurrent: true,
        userId,
      })

      sessionStorage.setItem("joinedRoomId", roomId)
      dispatch({ type: JOIN_ROOM_SUCCESS, payload: roomId })
      dispatch({ type: SET_ROOM_ID, payload: roomId })
      dispatch({ type: SET_ROOM_STATUS, payload: "joined" })

      dispatch(fetchOpponentData(roomId, userId))
    } else {
      dispatch({ type: JOIN_ROOM_FAIL, payload: "Room not found" })
    }
  } catch (error) {
    dispatch({ type: JOIN_ROOM_FAIL, payload: error.message })
    console.error("Error joining room:", error)
  }
}

export const deleteRoom = (roomId) => async (dispatch) => {
  dispatch({ type: DELETE_ROOM_REQUEST })

  try {
    const roomRef = ref(database, `rooms/${roomId}`)
    await remove(roomRef)

    sessionStorage.removeItem("hostedRoomId")
    dispatch({ type: DELETE_ROOM_SUCCESS })
    dispatch({ type: SET_ROOM_ID, payload: null })
    dispatch({ type: SET_ROOM_STATUS, payload: null })
  } catch (error) {
    dispatch({ type: DELETE_ROOM_FAIL, payload: error.message })
    console.error("Error deleting room:", error)
  }
}

export const leaveRoom = (roomId, userId) => async (dispatch) => {
  dispatch({ type: LEAVE_ROOM_REQUEST })

  try {
    const userRef = ref(database, `rooms/${roomId}/users/${userId}`)
    await remove(userRef)
    sessionStorage.removeItem("joinedRoomId")

    dispatch({ type: LEAVE_ROOM_SUCCESS })
    dispatch({ type: SET_ROOM_ID, payload: null })
    dispatch({ type: SET_ROOM_STATUS, payload: null })
  } catch (error) {
    dispatch({ type: LEAVE_ROOM_FAIL, payload: error.message })
    console.error("Error leaving room:", error)
  }
}

export const clearRoomError = () => ({
  type: CLEAR_ROOM_ERROR,
})
