import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Home, mapDispatchToProps, mapStateToProps } from '../../../components/authentication/Home';

describe('Tests Home component', () => {
  const props = {
    login: jest.fn(),
    signUp: jest.fn(),
    auth: {
      token: 'token',
    },
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  it('should mapDispatchToProps', (done) => {
    const sinonFn = sinon.spy();
    const user = mapDispatchToProps(sinonFn);
    user.logIn();
    user.signUp();
    expect(sinonFn.callCount).toBe(2);
    done();
  });

  it('should mapStateToProps', (done) => {
    const state = {
      auth: {
        user: 'user',
      },
    };
    const user = mapStateToProps(state);

    expect(user.auth).toEqual(state.auth);
    done();
  });
});
