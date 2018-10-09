import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../../common/NavBar';
import MyRequests from '../adminDashboard/MyRequests/MyRequestContainer';
import { getAdminRequest, editRequestStatus } from '../../actions/adminRequest.action';
import history from '../../util/history';

export class AdminDashboard extends Component {
  componentDidMount() {
    const { auth } = this.props;
    const authToken = auth.token;
    if (!authToken) {
      history.push('/');
      return null;
    }
    const { getRequest } = this.props;
    return getRequest();
  }

  render() {
    const { adminRequests, editStatus, auth } = this.props;
    return (
      <React.Fragment>
        <NavBar isUser={false} auth={auth} />
        <div className="admin">
          <div className="header">
            <h1>Logs of All Request</h1>
          </div>

          <div className="col-12 overflow padding">
            <MyRequests
              requests={adminRequests.requests}
              editStatus={editStatus}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AdminDashboard.propTypes = {
  adminRequests: PropTypes.shape({}).isRequired,
  editStatus: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  getRequest: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  auth: state.auth,
  adminRequests: state.adminRequests,
});

export const mapDispatchToProps = dispatch => ({
  getRequest: () => dispatch(getAdminRequest()),
  editStatus: (value) => {
    dispatch(editRequestStatus(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
