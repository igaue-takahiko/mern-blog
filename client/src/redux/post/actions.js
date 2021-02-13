import axios from 'axios';
import { postTypes } from './types';

export const createPost = (postData) => {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch({ type: postTypes.SET_LOADER })
    try {
      const { data: { msg } } = await axios.post('/create_post', postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({ type: postTypes.CLOSE_LOADER })
      dispatch({ type: postTypes.REMOVE_ERRORS })
      dispatch({ type: postTypes.REDIRECT_TRUE })
      dispatch({
        type: postTypes.SET_MESSAGE,
        payload: msg
      })
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response.data
      dispatch({ type: postTypes.CLOSE_LOADER })
      dispatch({
        type: postTypes.CRATE_ERRORS,
        payload: errors
      })
    }
  }
}

export const fetchPosts = (is, page) => {
  return async (dispatch) => {}
}
