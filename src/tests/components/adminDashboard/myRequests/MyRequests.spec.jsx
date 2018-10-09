import React from 'react';
import { shallow } from 'enzyme';
import MyRequests from '../../../../components/adminDashboard/MyRequests/MyRequests';

describe('Tests MyRequests Component', () => {
  const props = {
    request: [{
      id: 1,
      status: 'approve',
      date: 'now',
    },
    ],
    index: 1,
    editStatus: jest.fn(),
    title: 'title',
  };
  const props1 = {
    request: [{
      id: 1,
      status: 'approve',
      date: 'now',
    },
    ],
    index: 0,
    editStatus: jest.fn(),
    title: 'title',
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<MyRequests {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
  it('should make the index false', (done) => {
    const wrapper = shallow(<MyRequests {...props1} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
