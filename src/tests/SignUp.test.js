import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../components/authentication/signUpForm/SignUpForm';

describe('Tests SignUpForm component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
