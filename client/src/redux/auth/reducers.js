import { initialState } from '../store/initialState';
import { authTypes } from './types';
import { verifyToken } from './helpers';

const token = localStorage.getItem('myToken')
if (token) {
  const decoded = verifyToken(token)
  if (decoded) {
    initialState.auth.token = token
    const { user } = decoded
    initialState.auth.user = user
  }
}

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case authTypes.SET_LOADER:
      return {
        ...state,
        loading: true
      }
    case authTypes.CLOSE_LOADER:
      return {
        ...state,
        loading: false,
      }
    case authTypes.REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: action.payload
      }
    case authTypes.SET_TOKEN: {
      const decoded = verifyToken(action.payload)
      const { user } = decoded
      return {
        ...state,
        token: action.payload,
        user: user,
        loginErrors: [],
        registerErrors: [],
      }
    }
    case authTypes.LOGOUT:
      return {
        ...state,
        token: "",
        user: "",
      }
    case authTypes.LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload
      }
    default:
      return state
  }
}