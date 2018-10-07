import React from 'react';
import shortId from 'short-id';
import PropTypes, { shape, string, number } from 'prop-types';
import MyRequests from './myRequests';

export default class MyRequestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { requests, editRequest } = this.props;
    return (
      <React.Fragment>
        <table id="tableItem">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>Equipment</th>
              <th>Description</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{
          requests
            ? requests.map((request, index) => (
              <MyRequests
                key={shortId.generate()}
                request={request}
                index={index}
                editRequest={editRequest}
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
  editRequest: PropTypes.func.isRequired,
};

MyRequestContainer.defaultProps = {
  requests: [],
};
