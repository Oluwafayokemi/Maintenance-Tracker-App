import axios from 'axios';
import { SIGN_UP_USER } from './actionTypes';

export const signUpUserAction = user => ({
  type: SIGN_UP_USER,
  user,
});
const BASE_URL = 'https://calm-fortress-33069.herokuapp.com'; // production url//


export const signUpUserRequest = newUser => async (dispatch) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/auth/signup`,
      headers: { 'Content-Type': 'application/json' },
      data: newUser,
    });
    if (newUser.passwordCheck !== newUser.password) {
      toastr.error('password does not match');
    } else {
      toastr.success(response.data.message);
      return dispatch(signUpUserAction(response.data));
    }
  } catch ({ response }) {
    toastr.error(response.data.message);
  }
};

