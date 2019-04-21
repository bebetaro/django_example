import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

import userReducer from './userReducer';
import lessonReducer from './lessonReducer';

export default combineReducers({
  users: userReducer,
  lessons: lessonReducer,
  form: reducer
});
