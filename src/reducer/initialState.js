import localStorageUtil from '../util/localStorageUtil';

export default {
  user: localStorageUtil.getItem('maintenace-tracker') || {},
  adminRequests: {},
  userRequests: {},
  common: {
    errors: {},
    message: '',
    error: false,
    loading: false,
  },
};

