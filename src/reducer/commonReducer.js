import initialState from './initialState';
import { IS_COMPLETE, IS_LOADING } from '../actions/actionTypes';

export default (state = initialState.common, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case IS_COMPLETE:
      return {
        ...state,
        loading: false,
        error: false,
      };

    default:
      return {
        ...state,
      };
  }
};

