import { FETCH_USER, FETCH_LESSON } from './types';
import axios from 'axios';

export const fetchUsers = () => async dispatch => {
  const res = await axios.get('/api/user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchlessons = () => async dispatch => {
  const res = await axios.get('/api/lesson');
  dispatch({ type: FETCH_LESSON, payload: res.data });
};

export const submitUser = (values, history) => async dispatch => {
  await axios.post('/api/user/', values);
  history.push('/userlist');
};

export const submitLesson = (values, history) => async dispatch => {
  await axios.post('/api/lesson/', values);
  history.push('/lessonlist');
};

export const updateUser = (values, history) => async dispatch => {
  const url = `/api/user/${values.id}/`;
  await axios.put(url, values);
  history.push('/userlist');
};

export const updateLesson = (values, history) => async dispatch => {
  const url = `/api/lesson/${values.id}/`;
  await axios.put(url, values);
  history.push('/lessonlist');
};
