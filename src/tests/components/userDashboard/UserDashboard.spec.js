import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { UserDashboard, mapDispatchToProps, mapStateToProps } from '../../../components/userDashboard/UserDashboard';

describe('Tests AdminDashboard component', () => {
  const props = {
    requests: [],
    userRequests: jest.fn(),
    auth: {
      token: 'token',
    },
    history: {
      push: jest.fn(),
    },
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<UserDashboard {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  const props2 = {
    requests: [],
    userRequests: jest.fn(),
    auth: {
      token: null,
    },
    history: {
      push: jest.fn(),
    },
  };

  it('should redirect without errors when there is no token', (done) => {
    const wrapper = shallow(<UserDashboard {...props2} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  it('should mapDispatchToProps', (done) => {
    const sinonFn = sinon.spy();
    const request = mapDispatchToProps(sinonFn);
    request.userRequests();
    request.editRequest();
    expect(sinonFn.callCount).toBe(2);
    done();
  });

  it('should mapStateToProps', (done) => {
    const state = {
      auth: {
        user: 'user',
      },
      adminRequests: {
        requests: [],
      },
    };
    const request = mapStateToProps(state);

    expect(request.auth).toEqual(state.auth);
    done();
  });
});
