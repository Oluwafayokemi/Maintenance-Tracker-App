import React from 'react';
import { shallow } from 'enzyme';
import SignUpContainer from '../../../../components/authentication/signUpForm/SignUpFormContainer';

describe('Tests SignUpContainer component', () => {
  window.document.querySelector = jest.fn().mockReturnValue({ textContent: '' });
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'fayokemi',
    },
  };
  const props = {
    signUpUserRequest: jest.fn().mockResolvedValueOnce({ user: { isAdmin: true } }),
    input: {
      firstName: 'fayokemi',
      lastName: 'adeyina',
      email: 'fayoaright@gmail.com',
      department: 'department',
      password: 'fayokemi',
      passwordCheck: 'fayokemi',
    },
    history: {
      push: jest.fn(),
    },
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<SignUpContainer {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleChange(event);
    wrapper.instance().handleSubmit(event);
    done();
  });

  const props2 = {
    signUpUserRequest: jest.fn().mockResolvedValueOnce({ user: { isAdmin: false } }),
    input: {
      firstName: 'fayokemi',
      lastName: 'adeyina',
      email: 'fayoaright@gmail.com',
      department: 'department',
      password: 'fayokemi',
      passwordCheck: 'fayokemi',
    },
    history: {
      push: jest.fn(),
    },
  };

  it('if user is not an admin it should render without errors', (done) => {
    const wrapper = shallow(<SignUpContainer {...props2} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleSubmit(event);
    done();
  });
});
