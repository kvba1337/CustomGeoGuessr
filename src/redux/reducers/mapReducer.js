import {
  FETCH_MAP_FAIL,
  FETCH_MAP_REQUEST,
  FETCH_MAP_SUCCESS,
  SET_SELECTED_MAP,
} from "../constants/mapConstants"

const initialState = {
  loading: false,
  mapData: null,
  selectedMap: null,
  error: null,
}

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAP_REQUEST:
      return { ...state, loading: true }
    case FETCH_MAP_SUCCESS:
      return { ...state, loading: false, mapData: action.payload }
    case FETCH_MAP_FAIL:
      return { ...state, loading: false, error: action.payload }
    case SET_SELECTED_MAP:
      return { ...state, selectedMap: action.payload }
    default:
      return state
  }
}
