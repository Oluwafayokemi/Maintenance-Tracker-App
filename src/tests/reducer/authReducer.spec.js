
import authReducer from '../../reducer/authReducer';
import { SIGN_UP_USER, LOG_IN_USER, LOG_OUT_USER } from '../../actions/actionTypes';

describe('Tests AuthReducer', () => {
  const initialState = {
    user: {},
    common: {
      errors: {},
      message: '',
    },
  };

  it('should return the initial state', (done) => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual({});
    done();
  });

  it('should handle SIGN_UP_USER', (done) => {
    const auth = {
      user: {
        userId: 1,
        firstName: 'fayokemi',
        lastName: 'adeyina',
        email: 'fayoaright@gmail.com',
        department: 'Water Management',
        isAdmin: true,
      },
    };
    const action = {
      type: SIGN_UP_USER,
      user: auth.user,
    };

    const newState = authReducer(initialState, action);
    expect(newState.user.userId).toEqual(1);
    expect(newState.user.email).toEqual('fayoaright@gmail.com');
    expect(newState.user.firstName).toEqual('fayokemi');
    expect(newState.user.lastName).toEqual('adeyina');
    expect(newState.user.department).toEqual('Water Management');
    expect(newState.user.isAdmin).toEqual(true);
    done();
  });
  it('should handle LOG_IN_USER', (done) => {
    const auth = {
      user: {
        userId: 1,
        firstName: 'fayokemi',
        lastName: 'adeyina',
        email: 'fayoaright@gmail.com',
        department: 'Water Management',
        isAdmin: true,
      },
    };
    const action = {
      type: LOG_IN_USER,
      user: auth.user,
    };

    const newState = authReducer(initialState, action);
    expect(newState.user.userId).toEqual(1);
    expect(newState.user.email).toEqual('fayoaright@gmail.com');
    expect(newState.user.firstName).toEqual('fayokemi');
    expect(newState.user.lastName).toEqual('adeyina');
    expect(newState.user.department).toEqual('Water Management');
    expect(newState.user.isAdmin).toEqual(true);
    done();
  });

  it('should handle LOG_OUT_USER', (done) => {
    const auth = {
      user: {},
    };
    const action = {
      type: LOG_OUT_USER,
      user: auth.user,
    };

    const newState = authReducer(initialState, action);
    expect(newState).toEqual({});
    done();
  });
});
