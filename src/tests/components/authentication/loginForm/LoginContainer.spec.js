import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from '../../../../components/authentication/loginForm/LoginFormContainer';

describe('Tests LoginContainer component', () => {
  window.document.querySelector = jest.fn().mockReturnValue({ textContent: '' });
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'fayokemi',
    },
  };
  const props = {
    logInUserRequest: jest.fn().mockResolvedValueOnce({ user: { isAdmin: true } }),
    input: {
      email: 'fayoaright@gmail.com',
      password: 'fayo',
    },
    history: {
      push: jest.fn(),
    },
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<LoginContainer {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleChange(event);
    wrapper.instance().handleSubmit(event);
    done();
  });

  const props2 = {
    logInUserRequest: jest.fn().mockResolvedValueOnce({ user: { isAdmin: false } }),
    input: {
      email: 'fayoaright@gmail.com',
      password: 'fayo',
    },
    history: {
      push: jest.fn(),
    },
  };

  it('if user is not an admin it should render without errors', (done) => {
    const wrapper = shallow(<LoginContainer {...props2} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleSubmit(event);
    done();
  });
});
