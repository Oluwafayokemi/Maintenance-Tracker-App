import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../common/NavBar';

describe('Tests NavBar component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
