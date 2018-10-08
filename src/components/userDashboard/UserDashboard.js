import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../../common/NavBar';
import MyRequests from '../userDashboard/myRequests/myRequestsContainer';
import { fetchUserRequests, editUserRequest } from '../../actions/userRequest.action';
import history from '../../util/history';

export class UserDashboard extends Component {
  componentWillMount() {
    const { auth } = this.props;
    const authToken = auth.token;
    if (!authToken) {
      history.push('/');
      return null;
    }
    const { userRequests } = this.props;
    return userRequests();
  }

  render() {
    const { requests, editRequest } = this.props;
    return (
      <React.Fragment>
        <NavBar isUser />
        <div className="admin">
          <div className="header">
            <h1>Previous Requests</h1>
          </div>
          <div className="col-12 padding">

            <MyRequests
              requests={requests.requests}
              editRequest={editRequest}
            />
          </div>

        </div>
      </React.Fragment>
    );
  }
}

UserDashboard.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  requests: PropTypes.shape([]).isRequired,
  userRequests: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.userRequests,
});

export const mapDispatchToProps = dispatch => ({
  userRequests: () => dispatch(fetchUserRequests()),
  editRequest: request => dispatch(editUserRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
