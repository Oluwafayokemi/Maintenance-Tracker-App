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
        requests: state.requests.map((request) => {
          if (request.requestid === action.status.requestid) {
            return {
              ...action.status,
              firstname: request.firstname,
              lastname: request.lastname,
              email: request.email,
              department: request.department,
            };
          }
          return request;
        }),
        status: action.status,
      };
    case 'LOG_OUT_USER':
      return initialState.adminRequests;
    default:
      return {
        ...state,
      };
  }
};

