import React from 'react';
import { shallow } from 'enzyme';
import SelectResponseContainer from '../../../../components/adminDashboard/selectResponse/SelectResponseContainer';

describe('Tests SelectResponseContainer', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: '',
    },
  };

  const props = {
    requestid: 1,
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
    editStatus: jest.fn(),
    handleUpdate: jest.fn(),
    setRequestId: jest.fn(),
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<SelectResponseContainer {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleChange(event);
    wrapper.instance().handleUpdate(event);
    done();
  });
});
