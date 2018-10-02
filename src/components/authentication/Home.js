import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { signUpUserRequest } from '../../actions/signUp.action';
import { logInUserRequest } from '../../actions/logIn.action';
import SignUpForm from './signUpForm/SignUpForm';
import SignInForm from './signInForm/SignInForm';

class Home extends React.PureComponent {
  render() {
    const { logIn, signUp } = this.props;
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
              logInUserRequest={logIn}
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
                signUpUserRequest={signUp}
              />

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  signUp: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logIn: data => dispatch(logInUserRequest(data)),
  signUp: data => dispatch(signUpUserRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
