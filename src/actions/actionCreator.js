import { ADD_NEW_REQUEST, GET_ALL_REQUEST_ADMIN, GET_ALL_REQUEST_USER, GET_ONE_REQUEST } from './actionTypes';

export const addNewRequest = text => ({
  type: ADD_NEW_REQUEST,
  text,
});

export const getAllAdminRequest = text => ({
  type: GET_ALL_REQUEST_ADMIN,
  text,
});

export const getAllUserRequest = text => ({
  type: GET_ALL_REQUEST_USER,
  text,
});

export const getOneRequest = text => ({
  type: GET_ONE_REQUEST,
  text,
});
