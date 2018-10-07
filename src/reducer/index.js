import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminRequestReducer from './adminRequestReducer';
import userRequestReducer from './userRequestReducer';

export default combineReducers({
  adminRequests: adminRequestReducer,
  userRequests: userRequestReducer,
  auth: authReducer,
});
