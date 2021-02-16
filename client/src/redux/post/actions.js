import axios from "axios";
import { postTypes } from "./types";

export const createPost = (postData) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: postTypes.SET_LOADER });
    try {
      const {
        data: { msg },
      } = await axios.post("/create_post", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: postTypes.CLOSE_LOADER });
      dispatch({ type: postTypes.REMOVE_ERRORS });
      dispatch({ type: postTypes.REDIRECT_TRUE });
      dispatch({
        type: postTypes.SET_MESSAGE,
        payload: msg,
      });
    } catch (error) {
      const { errors } = error.response.data;
      dispatch({ type: postTypes.CLOSE_LOADER });
      dispatch({
        type: postTypes.CRATE_ERRORS,
        payload: errors,
      });
    }
  };
};

export const fetchPosts = (id, page) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: postTypes.SET_LOADER });
    try {
      const {
        data: { response, count, perPage },
      } = await axios.get(`/posts/${id}/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: postTypes.CLOSE_LOADER });
      dispatch({
        type: postTypes.SET_POSTS,
        payload: { response, count, perPage },
      });
    } catch (error) {
      dispatch({ type: postTypes.CLOSE_LOADER });
    }
  };
};

export const fetchPost = (id) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: postTypes.SET_LOADER });
    try {
      const {
        data: { post },
      } = await axios.get(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: postTypes.CLOSE_LOADER });
      dispatch({ type: postTypes.SET_POST, payload: post })
      dispatch({ type: postTypes })
    } catch (error) {
      dispatch({ type: postTypes.CLOSE_LOADER });
    }
  };
};
