import axios from 'axios';
import { authTypes } from './types';

export const postRegister = (userData) => {
  return async (dispatch) => {
    dispatch({ type: authTypes.SET_LOADER })
    try {
      const { data } = await axios.post('/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch({ type: authTypes.CLOSE_LOADER })
      localStorage.setItem('myToken', data.token)
      dispatch({ type: authTypes.SET_TOKEN, payload: data.token })
    } catch (error) {
      dispatch({ type: authTypes.CLOSE_LOADER })
      dispatch({
        type: authTypes.REGISTER_ERRORS,
        payload: error.response.data.errors
      })
    }
  }
}

export const postLogin = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authTypes.SET_LOADER })
      const { data } = await axios.post('/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch({ type: authTypes.CLOSE_LOADER })
      localStorage.setItem('myToken', data.token)
      dispatch({ type: authTypes.SET_TOKEN, payload: data.token })
    } catch (error) {
      dispatch({ type: authTypes.CLOSE_LOADER })
      dispatch({
        type: authTypes.LOGIN_ERRORS,
        payload: error.response.data.errors
      })
    }
  }
}
