import React from 'react';
import PropTypes from 'prop-types';

const MyRequests = ({ request, index }) => (
  <React.Fragment>
    <tr>
      <td>{index === 0 ? 1 : index + 1}</td>
      <td>{
        new Date(request.date).toLocaleString('en-GB', {
          hour12: true,
        })
      }
      </td>
      <td>{request.equipment}</td>
      <td>{request.status}</td>
      <td>
        <button className="submitBtn">Details</button>
      </td>
    </tr>
  </React.Fragment>
);

MyRequests.propTypes = {
  request: PropTypes.shape([]).isRequired,
  index: PropTypes.number.isRequired,
};

export default MyRequests;
