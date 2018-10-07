import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../../components/authentication/signUpForm/SignUpForm';

describe('Tests SignUpForm component', () => {
  const props = {
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    value: {
      firstName: 'firsname',
      lastName: 'lastName',
      email: 'email',
      department: 'department',
      password: 'password',
      passwordCheck: 'passWordCheck',
    },
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<SignUpForm {...props} />);
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
