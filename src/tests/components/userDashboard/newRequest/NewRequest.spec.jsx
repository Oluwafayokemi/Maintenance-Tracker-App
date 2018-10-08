import React from 'react';
import { shallow } from 'enzyme';
import NewRequest from '../../../../components/userDashboard/newRequest/NewRequest';

describe('Tests NewRequest component', () => {
  const props = {
    value: {
      equipment: 'equipment',
      description: 'description',
    },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  };

  it('should render without errors', (done) => {
    const wrapper = shallow(<NewRequest {...props} />);
    expect(wrapper).toBeTruthy();
    done();
  });
});

