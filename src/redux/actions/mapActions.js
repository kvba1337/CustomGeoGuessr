import { database } from "@services/firebaseConfig"
import { ref, update } from "firebase/database"
import {
  FETCH_MAP_FAIL,
  FETCH_MAP_REQUEST,
  FETCH_MAP_SUCCESS,
  SET_SELECTED_MAP,
} from "../constants/mapConstants"

export const fetchMap = (mapId) => async (dispatch) => {
  dispatch({ type: FETCH_MAP_REQUEST })

  try {
    const data = await import(`../../assets/data/maps/map${mapId}.json`)
    dispatch({ type: FETCH_MAP_SUCCESS, payload: data.default })
  } catch (error) {
    dispatch({ type: FETCH_MAP_FAIL, payload: error.message })
    console.error("Error fetching map data:", error)
  }
}

export const setSelectedMap = (mapId, roomId) => async (dispatch, getState) => {
  const { mapData } = getState().map

  const selectedMap = {
    mapId,
    title: mapData.name,
    description: mapData.description,
    zoomLevel: mapData.zoomLevel,
    factor: mapData.factor,
    defaultMapPosition: mapData.defaultMapPosition,
  }

  dispatch({ type: SET_SELECTED_MAP, payload: selectedMap })

  try {
    const roomRef = ref(database, `rooms/${roomId}`)
    await update(roomRef, { selectedMap })
  } catch (error) {
    console.error("Error updating selected map:", error)
  }
}
