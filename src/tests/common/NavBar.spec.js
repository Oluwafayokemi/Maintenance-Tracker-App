import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../../common/NavBar';

describe('Tests NavBar component', () => {
  const props = {
    isUser: true,
    logOut: jest.fn(),
    auth: {
      department: 'Water Management',
      email: 'omotola@gmail.com',
      firstName: 'omotola',
      isAdmin: false,
      lastName: 'adeyina',
      userId: 3,
    },
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
