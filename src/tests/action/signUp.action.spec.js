import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { SIGN_UP_USER } from '../../actions/actionTypes';
import { signUpUserRequest } from '../../actions/signUp.action';
import { userResponse } from '../mock/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SignUp Action Test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates SIGN_UP_USER after successful signup', async (done) => {
    moxios.wait(() => {
      const getUserRequest = moxios.requests.mostRecent();
      getUserRequest.respondWith({
        status: 200,
        response: userResponse,
      });
    });

    const returnedAction = {
      type: SIGN_UP_USER,
      user: userResponse,
    };

    const store = mockStore({});
    await store.dispatch(signUpUserRequest(returnedAction.user));
    expect(store.getActions()[0]).toEqual(returnedAction);
    done();
  });
});
