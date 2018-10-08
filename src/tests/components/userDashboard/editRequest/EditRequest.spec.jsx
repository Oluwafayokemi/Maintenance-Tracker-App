import React from 'react';
import { shallow } from 'enzyme';
import EditRequest from '../../../../components/userDashboard/editRequest/EditRequest';

describe('Tests EditRequest component', () => {
  const props = {
    value: {
      equipment: 'equipment',
      description: 'description',
    },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<EditRequest {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});

