import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { GET_ALL_REQUEST_ADMIN, CHANGE_REQUEST_STATUS } from '../../actions/actionTypes';
import { getAdminRequest, editRequestStatus } from '../../actions/adminRequest.action';
import { requestResponse, statusResponse } from '../mock/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Admin Dashboard', () => {
  describe('GET_ALL_REQUEST_ADMIN', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates GET_ALL_REQUEST_ADMIN after successful login', async (done) => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 200,
          response: requestResponse,
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
      });

      const returnedAction = {
        type: GET_ALL_REQUEST_ADMIN,
        requests: requestResponse.requests,
      };

      const store = mockStore({ auth: { token: 'some token' } });

      await store.dispatch(getAdminRequest(returnedAction.requests));
      expect(store.getActions()[0]).toEqual(returnedAction);
      done();
    });
  });

  describe('CHANGE_REQUEST_STATUS', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('creates CHANGE_REQUEST_STATUS after successful login', async (done) => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 201,
          response: statusResponse,
        });
      });

      const returnedAction = {
        type: CHANGE_REQUEST_STATUS,
        status: statusResponse.updatedRequest.request,
      };

      const store = mockStore({ auth: { token: 'some token' } });

      await store.dispatch(editRequestStatus({ requestId: 3, value: 'approved' }));
      expect(store.getActions()[0]).toEqual(returnedAction);
      done();
    });
  });
});
