import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from '../auth/reducers';
import { postReducer } from '../post/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
})

const middleWares = [thunk]
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleWares))
)

export default store
