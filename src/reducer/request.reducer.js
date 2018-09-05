// import { SHOW_TALENT_FRAMEWORK } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.request, action = {}) => {
  switch (action.type) {
    case 'SIGN_UP_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'LOG_IN_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'ADD_NEW_REQUEST':
      return {
        ...state,
        request: action.request,
      };

    case 'GET_ALL_USER_REQUEST':
      return {
        ...action.allUserRequest,
      };

    case 'GET_ONE_REQUEST':
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

