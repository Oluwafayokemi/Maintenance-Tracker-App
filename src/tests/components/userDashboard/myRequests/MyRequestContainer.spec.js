import React from 'react';
import { shallow } from 'enzyme';
import MyRequestContainer from '../../../../components/userDashboard/myRequests/myRequestsContainer';


describe('Tests MyRequestContainer', () => {
  const props = {
    requests: [
      {
        requestid: 1,
        firstname: 'fayokemi',
        lastname: 'adeyina',
        email: 'fayoaright@gmail.com',
        department: 'department',
        description: 'description',
        status: 'approve',
        date: 'now',
      },
      {
        requestid: 2,
        firstname: 'fayokemi',
        lastname: 'adeyina',
        email: 'fayoaright@gmail.com',
        department: 'department',
        description: 'description',
        status: 'approve',
        date: 'now',
      },
    ],
    editRequest: jest.fn(),
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<MyRequestContainer {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });

  const props2 = {
    requests: null,
  };

  it('should render empty request array without errors', (done) => {
    const wrapper = shallow(<MyRequestContainer {...props2} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
