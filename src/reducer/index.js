import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminRequestReducer from './adminRequestReducer';
import userRequestReducer from './userRequestReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  adminRequests: adminRequestReducer,
  userRequests: userRequestReducer,
  auth: authReducer,
  common: commonReducer,
});
