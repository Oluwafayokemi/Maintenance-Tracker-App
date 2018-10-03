import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../common/NavBar';
import Search from '../Search';
import MyRequests from '../userDashboard/myRequests/myRequestsContainer';
import { fetchUserRequests, editUserRequest } from '../../actions/userRequest.action';
import history from '../../util/history';

export class UserDashboard extends Component { 
  componentDidMount() {
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
          <div id="display" className="alert col-12">
            <p id="alert" />
          </div>
          <div className="header">
            <h1>Previous Requests</h1>
          </div>

          <Search isAdmin />
          <MyRequests
            requests={requests.requests}
            editRequest={editRequest}
          />

        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.userRequests,
});

const mapDispatchToProps = dispatch => ({
  userRequests: () => dispatch(fetchUserRequests()),
  editRequest: request => dispatch(editUserRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
