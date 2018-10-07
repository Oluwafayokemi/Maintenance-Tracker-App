import React from 'react';
import { shallow } from 'enzyme';
import DetailsModal from '../../../../components/adminDashboard/MyRequests/DetailsModal';

describe('Tests DetailsModal component', () => {
  const props = {
    request: [{
      id: 1,
      firstname: 'fayokemi',
      lastname: 'adeyina',
      email: 'fayoaright@gmail.com',
      department: 'department',
      description: 'description',
      status: 'approve',
      date: 'now',
    },
    ],
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<DetailsModal {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().toggleModal();
    done();
  });
});
