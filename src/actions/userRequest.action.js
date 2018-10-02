import toastr from 'toastr';
import { ADD_NEW_REQUEST, GET_USER_REQUESTS, IS_LOADING, IS_COMPLETE } from './actionTypes';
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

export const fetchUserRequest = requestDetails => async (dispatch, getState) => {
  dispatch({ type: IS_LOADING });
  const state = getState();
  const { token } = state.auth;
  try {
    const response = await fetchData({
      url: 'users/requests',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data: requestDetails,
    });
    dispatch({ type: IS_COMPLETE });
    if (response.data.status === 200) {
      toastr.success(response.data.message);
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
    return toastr.error('Network error');
  }
};

export const createUserRequest = newRequest => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
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
      localStorageUtil.setItem('usersRequest', {
        ...state.userRequests, ...response.data,
      });
      history.push('/user');
      return dispatch(addNewRequest(response.data));
    }
    const error = Object.assign({}, {
      status: response.data.status,
      message: response.data.message,
    });
    return toastr.error(error.message);
  } catch (error) {
    return toastr.error('Network error');
  }
};
