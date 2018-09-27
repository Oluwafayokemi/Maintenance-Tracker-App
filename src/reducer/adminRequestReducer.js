import initialState from './initialState';

export default (state = initialState.adminRequests, action) => {
  switch (action.type) {
    case 'GET_ALL_REQUEST_ADMIN':
      return {
        ...state,
        requests: action.requests,
      };

    case 'CHANGE_REQUEST_STATUS':
      return {
        ...state,
        requests: [
          action.status.request,
          ...state.requests.filter(request => request.requestid !== action.status.request.requestid),
        ],
      };

    default:
      return {
        ...state,
      };
  }
};

