import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

import userReducer from './userReducer';
import lessonReducer from './lessonReducer';
import claimReducer from './claimReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  users: userReducer,
  lessons: lessonReducer,
  claim: claimReducer,
  report: reportReducer,
  form: reducer
});
