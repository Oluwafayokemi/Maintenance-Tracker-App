import React from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';
import NavBar from '../../../common/NavBar';

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

const NewRequest = ({ value, handleChange, handleSubmit }) => (
  <React.Fragment>
    <NavBar />
    <div className="request">
      <div id="display" className="alert col-12">
        <p id="alert" />
      </div>
      <div className="col-12 center">
        <div className="table">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <h1>Make Your Request</h1>
              <p>Please fill in this form to make a request.</p>
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
      </div>
    </div>
  </React.Fragment>
);

NewRequest.propTypes = {
  value: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default NewRequest;
