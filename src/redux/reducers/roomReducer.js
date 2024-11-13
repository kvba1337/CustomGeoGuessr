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
} from "../constants/roomConstants";

const initialState = {
  loading: false,
  roomId: null,
  status: null,
  error: null,
  opponent: {
    userId: null,
    username: null,
    avatar: null,
  },
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
    case JOIN_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
    case LEAVE_ROOM_REQUEST:
      return { ...state, loading: true };
    case CREATE_ROOM_SUCCESS:
    case JOIN_ROOM_SUCCESS:
      return { ...state, loading: false, roomId: action.payload, error: null };
    case CREATE_ROOM_FAIL:
    case JOIN_ROOM_FAIL:
    case DELETE_ROOM_FAIL:
    case LEAVE_ROOM_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ROOM_SUCCESS:
    case LEAVE_ROOM_SUCCESS:
      return { ...state, loading: false, roomId: null, status: null };
    case SET_ROOM_ID:
      return { ...state, roomId: action.payload };
    case SET_ROOM_STATUS:
      return { ...state, status: action.payload };
    case CLEAR_ROOM_ERROR:
      return { ...state, error: null };
    case SET_OPPONENT_DATA:
      return {
        ...state,
        opponent: action.payload,
      };
    default:
      return state;
  }
};
