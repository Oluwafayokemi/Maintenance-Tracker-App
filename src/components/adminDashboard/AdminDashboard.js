import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../../common/NavBar';
import Search from '../Search';
import MyRequests from '../adminDashboard/MyRequests/MyRequestContainer';
import { getAdminRequest, editRequestStatus } from '../../actions/adminRequest.action';
import history from '../../util/history';

export class AdminDashboard extends Component {
  async componentWillMount() {
    const { auth } = this.props;
    const authToken = auth.token;
    if (!authToken) {
      history.push('/');
      return null;
    }
    const { getRequest } = await this.props;
    return getRequest();
  }

  render() {
    const { adminRequests, editStatus } = this.props;
    return (
      <React.Fragment>
        <NavBar isUser={false} />
        <div className="admin">
          <div id="display" className="alert col-12">
            <p id="alert" />
          </div>
          <div className="header">
            <h1>Logs of All Request</h1>
          </div>

          <Search isAdmin />

          <MyRequests
            requests={adminRequests.requests}
            editStatus={editStatus}
          />

          <div className="main col-12">

            <div type="submit" id="myBtn" />

            <div id="myModal" className="modal">

              <div className="modal-content">
                <span className="close">&times;</span>
                <div className="details">
                  <ol>
                    <li id="reqId" />
                    <li className="name" id="Name" />
                    <li id="department" />
                    <li className="des" id="Email" />
                    <li id="equ" />
                    <li className="des" id="descrip" />
                    <li id="stat" />
                    <li id="dat" />
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AdminDashboard.propTypes = {
  adminRequests: PropTypes.shape([]).isRequired,
  editStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  adminRequests: state.adminRequests,
});

const mapDispatchToProps = dispatch => ({
  getRequest: () => dispatch(getAdminRequest()),
  editStatus: (value) => {
    dispatch(editRequestStatus(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
