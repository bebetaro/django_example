import { FETCH_USER, FETCH_LESSON, FETCH_CLAIM } from './types';
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

export const fetchClaim = month => async dispatch => {
  const userList = await axios.get('/api/user');

  const url = `/api/claim/?month=${month}`;
  const res = await axios.get(url);

  if (res.data.length === 0) {
    const newData = userList.data.map(user => {
      user = {
        user: user['id'],
        name: user['name'],
        genre: 0,
        count: 0,
        price: 0
      };
      return user;
    });

    dispatch({ type: FETCH_CLAIM, payload: newData });
  } else {
    let counter = 0;
    const newData = userList.data.map(user => {
      if (user.id === res.data[counter].user) {
        user = {
          user: user['id'],
          name: user['name'],
          genre: res.data[counter]['genre'].split(','),
          price: res.data[counter]['price'],
          count: res.data[counter]['count']
        };
        counter++;
        return user;
      } else {
        user = {
          user: user['id'],
          name: user['name'],
          genre: 0,
          count: 0,
          price: 0
        };
        return user;
      }
    });

    dispatch({ type: FETCH_CLAIM, payload: newData });
  }
};
