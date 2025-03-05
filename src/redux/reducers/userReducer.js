import {
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_USER,
  SET_USER_AS_GUEST,
} from "../constants/userConstants"

const initialState = {
  userId: null,
  username: null,
  avatar: null,
  isGuest: false,
  isAuthenticated: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case SET_USER_AS_GUEST:
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT_USER:
      return initialState
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    default:
      return state
  }
}
