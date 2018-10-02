import toastr from 'toastr';
import { LOG_IN_USER, IS_LOADING, IS_COMPLETE } from './actionTypes';
import fetchData from '../util/fetchData';
import localStorageUtil from '../util/localStorageUtil';

export const logInUserAction = user => ({
  type: LOG_IN_USER,
  user,
});

export const logInUserRequest = userDetails => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  try {
    const response = await fetchData({
      method: 'post',
      url: 'auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: userDetails,
    });
    if (response.data.status === 200) {
      toastr.success(response.data.message);
      localStorageUtil.setItem('maintenace-tracker', { ...response.data.user, token: response.data.token });
      return dispatch(logInUserAction(response.data.user));
    }
    const error = Object.assign({}, {
      status: response.data.status,
      message: response.data.message,
    });
    return Promise.reject(error);
  } catch (error) {
    return toastr.error(error);
  }
};
