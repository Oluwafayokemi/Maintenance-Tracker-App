import React from 'react';
import PropTypes from 'prop-types';
import DetailsModal from './DetailsModal';

const MyRequests = ({
  request, index, editRequest,
}) => (
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
      <td>{request.description}</td>
      <td>{request.status}</td>
      <td>
        <DetailsModal
          request={request}
          editRequest={editRequest}
        />
      </td>
    </tr>
  </React.Fragment>
);

MyRequests.propTypes = {
  editRequest: PropTypes.func.isRequired,
  request: PropTypes.shape([]).isRequired,
  index: PropTypes.number.isRequired,
};

export default MyRequests;
