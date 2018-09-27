import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('Tests Header component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
