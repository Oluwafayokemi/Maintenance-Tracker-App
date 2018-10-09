import store from '../../rootReducer';
import { LOG_IN_USER } from '../../actions/actionTypes';
import { userResponse } from '../mock/data';
import { logInUserAction } from '../../actions/logIn.action';

describe('Tests AuthReducer', () => {
  const action = {
    type: LOG_IN_USER,
    user: userResponse.user,
  };

  it('should test for the store', (done) => {
    store.dispatch(logInUserAction(action.user));
    const { firstName } = store.getState().auth.user;
    expect(firstName).toEqual(userResponse.user.firstName);
    done();
  });
});
