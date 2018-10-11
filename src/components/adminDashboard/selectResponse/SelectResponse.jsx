import React from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

const selectData = [
  '--select--',
  'approve',
  'disapprove',
  'resolve',
];

const SelectResponse = ({
  handleUpdate, handleChange, value,
}) => (
  <React.Fragment>
    <form onSubmit={handleUpdate}>
      <select name="select" value={value} onChange={handleChange} className="selectBtn">
        {selectData.map(data => (
          <option
            name={data}
            value={data === '--select--'
                ? 'pending' : data}
            key={shortId.generate()}
          >
            {data}
          </option>))}
      </select>
      <button className="submitStatus">Submit</button>
    </form>
  </React.Fragment>
);

SelectResponse.propTypes = {
  handleUpdate: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

SelectResponse.defaultProps = {
  handleUpdate: () => {},
  handleChange: () => {},
  value: '',
};

export default SelectResponse;
