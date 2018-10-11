import initialState from './initialState';
import { SIGN_UP_USER, LOG_IN_USER, LOG_OUT_USER } from '../actions/actionTypes';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        ...state,
        user: action.user,
      };

    case LOG_IN_USER:
      return {
        ...state,
        user: action.user,
      };

    case LOG_OUT_USER:
      return initialState.user;

    default:
      return state;
  }
};
