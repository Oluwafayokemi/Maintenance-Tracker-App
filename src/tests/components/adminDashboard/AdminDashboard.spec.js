import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { AdminDashboard, mapDispatchToProps, mapStateToProps } from '../../../components/adminDashboard/AdminDashboard';

describe('Tests AdminDashboard component', () => {
  const props = {
    adminRequests: jest.fn(),
    editStatus: jest.fn(),
    getRequest: jest.fn(),
    auth: {
      token: 'token',
    },
    history: {
      push: jest.fn(),
    },
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<AdminDashboard {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  const props2 = {
    adminRequests: jest.fn(),
    editStatus: jest.fn(),
    getRequest: jest.fn(),
    auth: {
      token: null || '',
    },
    history: {
      push: jest.fn(),
    },
  };

  it('should redirect without errors when there is no token', (done) => {
    const wrapper = shallow(<AdminDashboard {...props2} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  it('should mapDispatchToProps', (done) => {
    const sinonFn = sinon.spy();
    const request = mapDispatchToProps(sinonFn);
    request.getRequest();
    request.editStatus();
    expect(sinonFn.callCount).toBe(2);
    done();
  });

  it('should mapStateToProps', (done) => {
    const state = {
      auth: {
        user: 'user',
      },
      userRequests: {
        requests: [],
      },
    };
    const request = mapStateToProps(state);

    expect(request.auth).toEqual(state.auth);
    done();
  });
});
