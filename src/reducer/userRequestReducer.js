import initialState from './initialState';
import { GET_USER_REQUESTS, ADD_NEW_REQUEST, EDIT_USER_REQUEST } from '../actions/actionTypes';

export default (state = initialState.userRequests, action) => {
  switch (action.type) {
    case ADD_NEW_REQUEST:
      return {
        ...state,
        request: action.request,
      };

    case GET_USER_REQUESTS:
      return {
        ...state,
        requests: action.requests,
      };

    case EDIT_USER_REQUEST:
      return {
        ...state,
        requests: state.requests.map((request) => {
          if (request.requestid === action.request.requestid) {
            return { ...action.request, date: request.date };
          }
          return request;
        }),
        request: action.request,
      };

    default:
      return {
        ...state,
      };
  }
};

