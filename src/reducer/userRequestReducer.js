import initialState from './initialState';

export default (state = initialState.userRequests, action) => {
  switch (action.type) {
    case 'ADD_NEW_REQUEST':
      return {
        ...state,
        request: action.request,
      };

    case 'GET_USER_REQUEST':
      return {
        ...state,
        requests: action.requests,
      };

    default:
      return {
        ...state,
      };
  }
};

