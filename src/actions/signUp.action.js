import toastr from 'toastr';
import { SIGN_UP_USER, IS_LOADING, IS_COMPLETE } from './actionTypes';
import fetchData from '../util/fetchData';
import localStorageUtil from '../util/localStorageUtil';

export const signUpUserAction = user => ({
  type: SIGN_UP_USER,
  user,
});

export const signUpUserRequest = newUser => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  try {
    if (newUser.passwordCheck !== newUser.password) {
      return toastr.error('password does not match');
    }
    const response = await fetchData({
      method: 'post',
      url: 'auth/signup',
      data: newUser,
    });
    dispatch({ type: IS_COMPLETE });
    toastr.success(response.data.message);
    localStorageUtil.setItem('maintenace-tracker', { ...response.data.user, token: response.data.token });
    return dispatch(signUpUserAction(response.data));
  } catch ({ response }) {
    return toastr.error(response.data.message);
  }
};
