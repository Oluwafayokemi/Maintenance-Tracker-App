import userRequestReducer from '../../reducer/userRequestReducer';
import { GET_USER_REQUESTS, ADD_NEW_REQUEST, EDIT_USER_REQUEST } from '../../actions/actionTypes';

describe('Tests User Request Reducer', () => {
  const initialState = {
    userRequests: {},
    common: {
      errors: {},
      message: '',
    },
  };

  it('should return the initial state', (done) => {
    expect(userRequestReducer(undefined, { type: '@@INIT' })).toEqual({});
    done();
  });

  it('should handle GET_USER_REQUESTS', (done) => {
    const user = {
      requests: {
        requestid: 24,
        userid: 3,
        department: 'Water Management',
        equipment: 'Electricity',
        description: 'left',
        status: 'resolved',
        date: '2018-09-04T11:04:49.885Z',

      },
    };
    const action = {
      type: GET_USER_REQUESTS,
      requests: user.requests,
    };

    const newState = userRequestReducer(initialState.userRequests, action);
    expect(newState.requests.requestid).toEqual(24);
    expect(newState.requests.userid).toEqual(3);
    expect(newState.requests.department).toEqual('Water Management');
    expect(newState.requests.equipment).toEqual('Electricity');
    expect(newState.requests.description).toEqual('left');
    expect(newState.requests.status).toEqual('resolved');
    expect(newState.requests.date).toEqual('2018-09-04T11:04:49.885Z');
    done();
  });

  it('should handle  ADD_NEW_REQUEST', (done) => {
    const request = {
      requestid: 24,
      userid: 3,
      department: 'Water Management',
      equipment: 'Electricity',
      description: 'left',
      status: 'resolved',
      date: '2018-09-04T11:04:49.885Z',

    };
    const action = {
      type: ADD_NEW_REQUEST,
      request,
    };

    const newState = userRequestReducer(initialState.userRequests, action);
    expect(newState.request.requestid).toEqual(request.requestid);
    expect(newState.request.userid).toEqual(request.userid);
    expect(newState.request.department).toEqual(request.department);
    expect(newState.request.equipment).toEqual(request.equipment);
    expect(newState.request.description).toEqual(request.description);
    expect(newState.request.status).toEqual(request.status);
    expect(newState.request.date).toEqual(request.date);
    done();
  });

  it('should handle EDIT_USER_REQUEST', (done) => {
    const requests = [
      {
        requestid: 24,
        userid: 3,
        department: 'Water Management',
        equipment: 'Electricity',
        description: 'left',
        status: 'resolved',
        date: '2018-09-04T11:04:49.885Z',
      },
      {
        requestid: 23,
        userid: 3,
        department: 'Water Management',
        equipment: 'Electricity',
        description: 'left',
        status: 'resolved',
        date: '2018-09-04T11:04:49.885Z',
      },
    ];

    const request = {
      requestid: 24,
      userid: 3,
      department: 'Water Management',
      equipment: 'Electricity',
      description: 'left',
      status: 'resolved',
      date: '2018-09-04T11:04:49.885Z',
    };

    const action = {
      type: EDIT_USER_REQUEST,
      request,
    };

    const state = {
      requests,
    };

    const newState = userRequestReducer(state, action);
    expect(newState.requests[0].requestid).toEqual(request.requestid);
    expect(newState.requests[0].userid).toEqual(request.userid);
    expect(newState.requests[0].department).toEqual(request.department);
    expect(newState.requests[0].equipment).toEqual(request.equipment);
    expect(newState.requests[0].description).toEqual(request.description);
    expect(newState.requests[0].status).toEqual(request.status);
    expect(newState.requests[0].date).toEqual(request.date);
    done();
  });
});
