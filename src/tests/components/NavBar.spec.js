import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../../common/NavBar';

describe('Tests NavBar component', () => {
  it('should render without errors', (done) => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toBeTruthy();
    done();
  });
});