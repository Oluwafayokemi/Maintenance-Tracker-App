import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../../components/authentication/loginForm/LoginForm';

const mockEvent = { target: {}, preventDefault: () => jest.fn() };

describe('Tests SignInForm component', () => {
  const props = {
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    value: {
      email: 'email',
      password: 'password',
    },
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<LoginForm {...props} />);
    wrapper.find('[name="email"]').simulate('change', { target: { value: 'test@email.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { value: 'Password' } });
    wrapper.find('form').simulate('submit', mockEvent);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
