import React from 'react';
import { shallow } from 'enzyme';
import SelectResponse from '../../../../components/adminDashboard/selectResponse/SelectResponse';


describe('Tests SelectResponse component', () => {
  const props = {
    requestId: 1,
    handleUpdate: jest.fn(),
    setRequestId: jest.fn(),
    handleChange: jest.fn(),
  };
  it('should render without errors', (done) => {
    const wrapper = shallow(<SelectResponse {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});
