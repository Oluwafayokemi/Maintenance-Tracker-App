import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_NEW_REQUEST, GET_USER_REQUESTS, EDIT_USER_REQUEST } from '../../actions/actionTypes';
import { createUserRequest, fetchUserRequests, editUserRequest } from '../../actions/userRequest.action';
import { newRequestData, userRequest, statusResponse } from '../mock/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Dashboard', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('ADD_NEW_REQUEST', () => {
    it('creates ADD_NEW_REQUEST after successful login', async (done) => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 201,
          response: newRequestData,
        });
      });

      const returnedAction = {
        type: ADD_NEW_REQUEST,
        request: newRequestData,
      };

      const store = mockStore({ auth: { token: 'some token' } });

      await store.dispatch(createUserRequest(returnedAction.request));
      expect(store.getActions()[0]).toEqual(returnedAction);
      done();
    });
  });

  describe('GET_USER_REQUESTS', () => {
    it('creates GET_USER_REQUESTS after successful login', async (done) => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 200,
          response: userRequest,
        });
      });

      const returnedAction = {
        type: GET_USER_REQUESTS,
        requests: userRequest.requests,
      };

      const store = mockStore({ auth: { token: 'some token' } });
      await store.dispatch(fetchUserRequests(returnedAction.requests));
      expect(store.getActions()[0]).toEqual(returnedAction);
      done();
    });
  });

  describe('EDIT_USER_REQUEST', () => {
    it('creates EDIT_USER_REQUEST after successful login', async (done) => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 201,
          response: statusResponse,
        });
      });

      const returnedAction = {
        type: EDIT_USER_REQUEST,
        requests: statusResponse.request,
      };

      const store = mockStore({ auth: { token: 'some token' } });
      await store.dispatch(editUserRequest({ requestid: 6 }));
      expect(store.getActions()[0]).toEqual(returnedAction);
      done();
    });
  });
});
