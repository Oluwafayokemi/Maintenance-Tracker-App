import toastr from 'toastr';
import { LOG_IN_USER, LOG_OUT_USER } from './actionTypes';
import fetchData from '../util/fetchData';
import { clearState } from '../util/persistState';

export const logInUserAction = user => ({
  type: LOG_IN_USER,
  user,
});

export const logOutAction = (user) => {
  clearState();
  return {
    type: LOG_OUT_USER,
    user,
  };
};

export const logInUserRequest = userDetails => async (dispatch) => {
  try {
    const response = await fetchData({
      method: 'post',
      url: 'auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: userDetails,
    });
    if (response.data.status === 200) {
      const { user } = response.data;
      user.token = response.data.token;
      toastr.success(response.data.message);
      return dispatch(logInUserAction(user));
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
