import toastr from 'toastr';
import { GET_ALL_REQUEST_ADMIN, CHANGE_REQUEST_STATUS } from './actionTypes';
import localStorageUtil from '../util/localStorageUtil';
import fetchData from '../util/fetchData';

export const getAllAdminRequest = requests => ({
  type: GET_ALL_REQUEST_ADMIN,
  requests,
});

export const changeRequestStatus = status => ({
  type: CHANGE_REQUEST_STATUS,
  status,
});

export const getAdminRequest = requestDetails => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  try {
    const response = await fetchData({
      method: 'get',
      url: 'requests',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data: requestDetails,
    });
    if (response.data.status === 200) {
      toastr.success(response.data.message);
      localStorageUtil.setItem('maintenance-tracker', {
        ...state.adminRequests, ...response.data,
      });
      return dispatch(getAllAdminRequest(response.data.requests));
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

export const editRequestStatus = status => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  try {
    const response = await fetchData({
      method: 'put',
      url: `requests/${status.requestId}/${status.value}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data: status,
    });
    if (response.data.status === 201) {
      toastr.success(response.data.message);
      localStorageUtil.setItem('maintenance-tracker', {
        ...state.adminRequests, ...response.data,
      });
      return dispatch(changeRequestStatus(response.data.updatedRequest.request));
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

