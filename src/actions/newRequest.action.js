import axios from 'axios';
import { ADD_NEW_REQUEST } from './actionTypes';

export const addNewRequest = request => ({
  type: ADD_NEW_REQUEST,
  request,
});

const BASE_URL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

export const createUserRequest = requestDetails => async (dispatch) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/users/requests`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.token}`,
      },
      data: requestDetails,
    });
    toastr.success(response.data.message);
    return dispatch(addNewRequest(response.data));
  } catch ({ response }) {
    toastr.error(response.data.message);
  }
};
