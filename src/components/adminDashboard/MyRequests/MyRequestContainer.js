import React from 'react';
import shortId from 'short-id';
import PropTypes, { shape, number, string } from 'prop-types';
import MyRequests from './MyRequests';

export default class MyRequestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { requests, editStatus } = this.props;
    return (
      <React.Fragment>
        <table id="tableItem">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>Equipment</th>
              <th>Action</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{
          requests
            ? requests.map((request, index) => (
              <MyRequests
                key={shortId.generate()}
                request={request}
                index={index}
                editStatus={editStatus}
              />
            )) : null
          }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

MyRequestContainer.propTypes = {
  requests: PropTypes.arrayOf(shape({
    requestid: number,
    userid: number,
    firstname: string,
    lastname: string,
    email: string,
    department: string,
    equipment: string,
    description: string,
    status: string,
    date: string,
  })),
  editStatus: PropTypes.func.isRequired,
};

MyRequestContainer.defaultProps = {
  requests: [],
};
