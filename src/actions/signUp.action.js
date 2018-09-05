import axios from 'axios';
import { SIGN_UP_USER } from './actionTypes';

export const signUpUserAction = user => ({
  type: SIGN_UP_USER,
  user,
});
const BASE_URL = 'https://calm-fortress-33069.herokuapp.com'; // production url//


export const signUpUserRequest = newUser => async (dispatch) => {
  try {
    if (newUser.passwordCheck !== newUser.password) {
      return toastr.error('password does not match');
    }
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/auth/signup`,
      headers: { 'Content-Type': 'application/json' },
      data: newUser,
    });
    toastr.success(response.data.message);
    localStorage.setItem('token', response.data.token);
    return dispatch(signUpUserAction(response.data));
  } catch ({ response }) {
    toastr.error(response.data.message);
  }
};
