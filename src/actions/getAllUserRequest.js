import axios from 'axios';
import { GET_ALL_REQUEST_USER } from './actionTypes';

export const getAllUserRequest = allUserRequest => ({
  type: GET_ALL_REQUEST_USER,
  allUserRequest,
});

const BASE_URL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

export const getUsersRequest = requestDetails => async (dispatch) => {
  console.log(requestDetails, '##############');
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/api/v1/users/requests`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.token}`,
      },
      data: requestDetails,
    });
    toastr.success(response.data.message);
    return dispatch(getAllUserRequest(response.data));
  } catch ({ response }) {
    toastr.error(response.data.message);
  }
};
