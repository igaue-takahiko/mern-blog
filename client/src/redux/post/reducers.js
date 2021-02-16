import { initialState } from '../store/initialState';
import { postTypes } from './types';

export const postReducer = (state = initialState.post, action) => {
  switch (action.type) {
    case postTypes.SET_LOADER:
      return {
        ...state,
        loading: true
      }
    case postTypes.CLOSE_LOADER:
      return {
        ...state,
        loading: false
      }
    case postTypes.CRATE_ERRORS:
      return {
        ...state,
        createErrors: action.payload
      }
    case postTypes.REDIRECT_TRUE:
      return {
        ...state,
        redirect: true
      }
    case postTypes.REDIRECT_FALSE:
      return {
        ...state,
        redirect: false
      }
    case postTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case postTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: ""
      }
    case postTypes.REMOVE_ERRORS:
      return {
        ...state,
        createErrors: []
      }
    case postTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload.response,
        count: action.payload.count,
        perPage: action.payload.perPage,
      }
    case postTypes.SET_POST:
      return {
        ...state,
        post: action.payload
      }
    case postTypes.POST_REQUEST:
      return {
        ...state,
        postStatus: true
      }
    case postTypes.POST_RESET:
      return {
        ...state,
        postStatus: false
      }
    default:
      return state
  }
}
