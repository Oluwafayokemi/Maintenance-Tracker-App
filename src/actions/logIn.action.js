import axios from 'axios';
import { LOG_IN_USER } from './actionTypes';

export const logInUserAction = user => ({
  type: LOG_IN_USER,
  user,
});

const BASE_URL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

export const logInUserRequest = userDetails => async (dispatch) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/auth/login`,
      headers: { 'Content-Type': 'application/json' },
      data: userDetails,
    });
    toastr.success(response.data.message);
    localStorage.setItem('token', response.data.token);
    return dispatch(logInUserAction(response.data));
  } catch ({ response }) {
    toastr.error(response.data.message);
  }
};
