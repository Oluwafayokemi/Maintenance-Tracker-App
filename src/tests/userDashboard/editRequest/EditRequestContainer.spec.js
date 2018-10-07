import React from 'react';
import { shallow } from 'enzyme';
import EditRequest from '../../../components/userDashboard/editRequest/EditRequestContainer';

describe('Tests EditRequest container', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: jest.fn(),
    },
  };
  const props = {
    editRequest: jest.fn(),
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<EditRequest {...props} />);
    expect(wrapper).toBeTruthy();
    wrapper.instance().handleChange(event);
    wrapper.instance().handleSubmit(event);
    wrapper.instance().componentDidMount();
    done();
  });
});

