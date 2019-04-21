import { FETCH_REPORT } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REPORT:
      return action.payload;

    default:
      return state;
  }
};
