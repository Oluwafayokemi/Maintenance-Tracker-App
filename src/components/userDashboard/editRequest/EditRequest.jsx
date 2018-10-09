import React from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

const selectOptions = [
  '----Select----',
  'Air Condition',
  'Generator',
  'Electricity',
  'Paintings',
  'Computers',
  'Ups',
  'Camera',
  'Others',
];

const EditRequest = ({ value, handleChange, handleSubmit }) => (
  <React.Fragment>
    <div className="request">
      <form id="update-form" onSubmit={handleSubmit}>
        <div className="editForm">
          <h1>Form field to Edit Your Request</h1>
          <p>Kindly chceck to make sure all fields are filled out appropriately</p>
          <hr />
          <label htmlFor="equipment">
            <strong>Equipment</strong>
          </label>

          <select
            value={value.equipment}
            onChange={handleChange}
            className="btn-btn"
            name="equipment"
          >
            {selectOptions.map(option => (
              <option value={option} key={shortId.generate()}>{option}</option>
            ))}
          </select>

          <label
            className="desc"
            htmlFor="description"
          >
            <strong>Description</strong>
          </label>
          <textarea
            name="description"
            value={value.description}
            className="btn-btn"
            onChange={handleChange}
            placeholder="Please give a brief description of your report"
            required
          />
          <hr />
          <div className="btn">
            <button
              type="submit"
              className="submitbtn"
            >Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </React.Fragment>
);

EditRequest.propTypes = {
  value: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditRequest;
