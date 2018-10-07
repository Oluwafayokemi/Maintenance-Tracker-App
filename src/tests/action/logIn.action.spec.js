import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LOG_IN_USER } from '../../actions/actionTypes';
import { logInUserRequest } from '../../actions/logIn.action';
import { userResponse } from '../mock/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Action Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates LOG_IN_USER after successful login', async (done) => {
    moxios.wait(() => {
      const getUserRequest = moxios.requests.mostRecent();
      getUserRequest.respondWith({
        status: 200,
        response: userResponse,
      });
    });

    const returnedAction = {
      type: LOG_IN_USER,
      user: userResponse.user,
    };

    const store = mockStore({});

    await store.dispatch(logInUserRequest(returnedAction.user));
    expect(store.getActions()[0]).toEqual(returnedAction);
    done();
  });

  it('creates LOG_IN_USER after failed login', async (done) => {
    moxios.wait(() => {
      const getUserRequest = moxios.requests.mostRecent();
      getUserRequest.respondWith({
        status: 201,
        response: userResponse,
      });
    });

    const returnedAction = {
      type: LOG_IN_USER,
      user: userResponse.user,
    };

    const store = mockStore({});

    await store.dispatch(logInUserRequest(returnedAction.user));
    expect(store.getActions()[0]).toEqual(returnedAction);
    done();
  });
});
