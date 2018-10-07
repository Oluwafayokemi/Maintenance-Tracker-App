import React from 'react';
import { shallow } from 'enzyme';
import MyRequests from '../../../components/userDashboard/myRequests/myRequests';

describe('Tests MyRequests Container', () => {
  const props = {
    request: [{
      equipment: 'equipment',
      description: 'description',
      status: 'status',
    },
    ],
    editRequest: jest.fn(),
    index: 1,
  };

  const props2 = {
    request: [{
      equipment: 'equipment',
      description: 'description',
      status: 'status',
    },
    ],
    editRequest: jest.fn(),
    index: 0,
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<MyRequests {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
  it('should make the index false', (done) => {
    const wrapper = shallow(<MyRequests {...props2} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
