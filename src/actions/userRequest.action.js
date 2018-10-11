import toastr from 'toastr';
import { ADD_NEW_REQUEST, GET_USER_REQUESTS, EDIT_USER_REQUEST } from './actionTypes';
import fetchData from '../util/fetchData';
import localStorageUtil from '../util/localStorageUtil';
import history from '../util/history';

export const addNewRequest = request => ({
  type: ADD_NEW_REQUEST,
  request,
});
export const getUserRequests = requests => ({
  type: GET_USER_REQUESTS,
  requests,
});
export const editRequests = request => ({
  type: EDIT_USER_REQUEST,
  request,
});

export const fetchUserRequests = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth.user;
  try {
    const response = await fetchData({
      url: 'users/requests',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
    });
    if (response.status === 200) {
      localStorageUtil.setItem('usersRequest', {
        ...state.userRequests, ...response.data,
      });
      return dispatch(getUserRequests(response.data.requests));
    }
    const error = Object.assign({}, {
      status: response.data.status,
      message: response.data.message,
    });
    return toastr.error(error.message);
  } catch (error) {
    return toastr.error(error.message);
  }
};

export const createUserRequest = newRequest => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth.user;
  try {
    const response = await fetchData({
      method: 'post',
      url: 'users/requests',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data: newRequest,
    });
    if (response.data.status === 201) {
      toastr.success(response.data.message);
      history.push('/user');
      return dispatch(addNewRequest(response.data));
    }
    const error = Object.assign({}, {
      status: response.data.status,
      message: response.data.message,
    });
    return toastr.error(error.message);
  } catch (error) {
    return toastr.error(error.message);
  }
};

export const editUserRequest = request => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth.user;
  try {
    const response = await fetchData({
      method: 'put',
      url: `users/requests/${request.requestid}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data: {
        description: request.description,
        equipment: request.equipment,
      },
    });
    if (response.data.status === 201) {
      toastr.success(response.data.message);
      history.push('/user');
      return dispatch(editRequests(response.data.request));
    }
    const error = Object.assign({}, {
      status: response.data.status,
      message: response.data.message,
    });
    return toastr.error(error.message);
  } catch (error) {
    return toastr.error(error.message);
  }
};
