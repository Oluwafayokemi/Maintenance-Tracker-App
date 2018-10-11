import toastr from 'toastr';
import { SIGN_UP_USER } from './actionTypes';
import fetchData from '../util/fetchData';
import localStorageUtil from '../util/localStorageUtil';

export const signUpUserAction = user => ({
  type: SIGN_UP_USER,
  user,
});

export const signUpUserRequest = newUser => async (dispatch) => {
  try {
    if (newUser.passwordCheck !== newUser.password) {
      return toastr.error('password does not match');
    }
    const response = await fetchData({
      method: 'post',
      url: 'auth/signup',
      data: newUser,
    });
    if (response.data.status === 200) {
      toastr.success(response.data.message);
      return dispatch(signUpUserAction(response.data));
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
