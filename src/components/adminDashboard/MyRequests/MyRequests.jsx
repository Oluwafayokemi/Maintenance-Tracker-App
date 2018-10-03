import React from 'react';
import PropTypes from 'prop-types';
import SelectResponse from '../selectResponse';
import DetailsModal from '../MyRequests/DetailsModal';

const MyRequests = ({
  request, index, editStatus, title,
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
      <td>
        <SelectResponse
          editStatus={editStatus}
          requestId={request.requestid}
          requests={request}
        />
      </td>
      <td>{request.status}</td>
      <td>
        <DetailsModal
          title={title}
          request={request}
        />
      </td>
    </tr>
  </React.Fragment>
);

MyRequests.propTypes = {
  request: PropTypes.shape([]).isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  editStatus: PropTypes.func.isRequired,
};

export default MyRequests;
