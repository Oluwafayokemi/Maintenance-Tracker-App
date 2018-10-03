import initialState from './initialState';

export default (state = initialState.adminRequests, action) => {
  switch (action.type) {
    case 'GET_ALL_REQUEST_ADMIN':
      return {
        ...state,
        requests: action.requests,
      };

    case 'CHANGE_REQUEST_STATUS':
      console.log(action, 'admin request shape ------------');
      return {
        ...state,
        requests: state.requests.map((request) => {
          if (request.requestid === action.status.requestid) {
            return { ...action.status };
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

