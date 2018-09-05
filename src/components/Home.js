import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUserRequest } from '../actions/signUp.action';
import { logInUserRequest } from '../actions/logIn.action';
import '../styles/App.scss';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export class Home extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="base">
          <div className="row " id="header">
            <div className="col-6 maintenance-box">
              <a href="home.html">
                <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/256/maintenance-icon.png" alt="logo" />
              </a>
            </div>

            <SignInForm
              logInUserRequest={this.props.logInUserRequest}
            />

            <div id="display" className="alert col-12">
              <p id="alert" />
            </div>
            <div className="row ">
              <div className="col-6">
                <div className="col-12">
                  <div className="col-8 text">
                    <h2 className="col-3 p">Welcome to the Maintenance Tracker Site!</h2>
                    <h3 className="col-2 p">Here you have the priviledge of reporting to us on any issue concerning the management of the company equipment</h3>
                    <h3 className="col3 p">If you notice any damage, please do report early to prevent worse damages</h3>
                  </div>
                </div>
              </div>

              <SignUpForm
                signUpUserRequest={this.props.signUpUserRequest}
              />

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  signUpUserRequest: PropTypes.func.isRequired,
  logInUserRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  signUpUserRequest, logInUserRequest,
}, dispatch);

export default connect(null, mapDispatchToProps)(Home);
