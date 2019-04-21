import { FETCH_CLAIM } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CLAIM:
      return action.payload;

    default:
      return state;
  }
};
