import adminRequestReducer from '../../reducer/adminRequestReducer';
import { GET_ALL_REQUEST_ADMIN, CHANGE_REQUEST_STATUS } from '../../actions/actionTypes';

describe('Tests User Request Reducer', () => {
  const initialState = {
    adminRequests: {},
    common: {
      errors: {},
      message: '',
    },
  };

  it('should return the initial state', (done) => {
    expect(adminRequestReducer(undefined, { type: '@@INIT' })).toEqual({});
    done();
  });

  it('should handle GET_ALL_REQUESTS_ADMIN', () => {
    const requests = {
      requestid: 24,
      userid: 3,
      firstname: 'omotola',
      lastname: 'adeyina',
      email: 'omotola@gmail.com',
      department: 'Water Management',
      equipment: 'Electricity',
      description: 'aisdfj;aosidfoasdf',
      status: 'resolved',
      date: '2018-09-04T11:04:49.885Z',
    };

    const action = {
      type: GET_ALL_REQUEST_ADMIN,
      requests,
    };

    const newState = adminRequestReducer(initialState.adminRequests, action);
    expect(newState.requests.requestid).toEqual(requests.requestid);
    expect(newState.requests.userid).toEqual(requests.userid);
    expect(newState.requests.firstname).toEqual(requests.firstname);
    expect(newState.requests.lastname).toEqual(requests.lastname);
    expect(newState.requests.email).toEqual(requests.email);
    expect(newState.requests.department).toEqual(requests.department);
    expect(newState.requests.equipment).toEqual(requests.equipment);
    expect(newState.requests.description).toEqual(requests.description);
    expect(newState.requests.status).toEqual(requests.status);
    expect(newState.requests.date).toEqual(requests.date);
  });

  it('should handle  CHANGE_REQUEST_STATUS', (done) => {
    const requests = [
      {
        requestid: 24,
        userid: 3,
        firstname: 'omotola',
        lastname: 'adeyina',
        email: 'omotola@gmail.com',
        department: 'Water Management',
        equipment: 'Electricity',
        description: 'aisdfj;aosidfoasdf',
        status: 'resolved',
        date: '2018-09-04T11:04:49.885Z',
      },
      {
        requestid: 23,
        userid: 3,
        firstname: 'omotola',
        lastname: 'adeyina',
        email: 'omotola@gmail.com',
        department: 'Water Management',
        equipment: 'Electricity',
        description: 'aisdfj;aosidfoasdf',
        status: 'resolved',
        date: '2018-09-04T11:04:49.885Z',
      },
    ];

    const status = {
      requestid: 23,
      userid: 3,
      firstname: 'omotola',
      lastname: 'adeyina',
      email: 'omotola@gmail.com',
      department: 'Water Management',
      equipment: 'Electricity',
      description: 'aisdfj;aosidfoasdf',
      status: 'resolved',
      date: '2018-09-04T11:04:49.885Z',
    };

    const action = {
      type: CHANGE_REQUEST_STATUS,
      status,
    };
    const state = {
      requests,
    };
    const newState = adminRequestReducer(state, action);
    expect(newState.requests[1].requestid).toEqual(status.requestid);
    expect(newState.requests[1].userid).toEqual(status.userid);
    expect(newState.requests[1].department).toEqual(status.department);
    expect(newState.requests[1].equipment).toEqual(status.equipment);
    expect(newState.requests[1].description).toEqual(status.description);
    expect(newState.requests[1].status).toEqual(status.status);
    expect(newState.requests[1].date).toEqual(status.date);
    done();
  });
});
