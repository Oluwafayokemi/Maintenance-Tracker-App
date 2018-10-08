import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../components/Search';

describe('Tests Search component', () => {
  it('should render without errors', (done) => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
