import { ADD_NEW_REQUEST, SIGN_UP_USER, GET_ALL_REQUEST, GET_ONE_REQUEST } from './actionTypes';

export const addNewRequest = text => ({
  type: ADD_NEW_REQUEST,
  text,
});

export const getAllRequest = text => ({
  type: GET_ALL_REQUEST,
  text,
});

export const getOneRequest = text => ({
  type: GET_ONE_REQUEST,
  text,
});
