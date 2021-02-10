import { initialState } from '../store/initialState';
import { authTypes } from './types';

export const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case authTypes.SET_LOADER:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}