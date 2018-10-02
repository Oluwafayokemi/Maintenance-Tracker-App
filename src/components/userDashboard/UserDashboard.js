import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../common/NavBar';
import Search from '../Search';
import MyRequests from '../userDashboard/myRequests/myRequestsContainer';
import { fetchUserRequest } from '../../actions/userRequest.action';
import history from '../../util/history';

export class UserDashboard extends Component {
  async componentDidlMount() {
    const { auth } = this.props;
    const authToken = auth.token;
    if (!authToken) {
      history.push('/');
      return null;
    }
    const { getRequests } = await this.props;
    return getRequests();
  }

  render() {
    const { getRequests } = this.props;
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
            requests={getRequests.requests}
          />

        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userRequests: state.userRequests,
});

const mapDispatchToProps = dispatch => ({
  getRequests: () => dispatch(fetchUserRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
