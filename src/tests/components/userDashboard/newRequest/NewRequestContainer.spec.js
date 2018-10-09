import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { NewRequestContainer, mapDispatchToProps, mapStateToProps } from '../../../../components/userDashboard/newRequest/NewRequestContainer';

describe('Tests NewRequest container', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: jest.fn(),
    },
  };
  const props = {
    createRequest: jest.fn(),
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<NewRequestContainer {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleChange(event);
    wrapper.instance().handleSubmit(event);
    done();
  });
});

it('should mapDispatchToProps', (done) => {
  const sinonFn = sinon.spy();
  const request = mapDispatchToProps(sinonFn);
  request.createRequest();
  expect(sinonFn.callCount).toBe(1);
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

