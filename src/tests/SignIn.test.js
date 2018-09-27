import React from 'react';
import { shallow } from 'enzyme';
import SignInForm from '../components/authentication/signInForm/SignInForm';

const mockEvent = { target: {}, preventDefault: () => jest.fn() }

describe('Tests SignInForm component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<SignInForm />);
    wrapper.find('[name="email"]').simulate('change', { target: { value: 'test@email.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { value: 'Password' } });
    wrapper.find('form').simulate('submit', mockEvent);
    expect(wrapper).toMatchSnapshot();
  });
});
