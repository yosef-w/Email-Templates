// rootReducer.js

import { combineReducers } from 'redux';
import emailReducer from './reducers';
import nameReducer from './nameReducer';

const rootReducer = combineReducers({
  email: emailReducer,
  name: nameReducer
});

export default rootReducer;
