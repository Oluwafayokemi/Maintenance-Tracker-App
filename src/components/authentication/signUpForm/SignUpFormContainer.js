import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../util/history';
import SignUpForm from './SignUpForm';

export default class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      department: '',
      email: '',
      password: '',
      passwordCheck: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    const { signUpUserRequest } = this.props;
    event.preventDefault();
    signUpUserRequest(this.state)
      .then((response) => {
        if (response.user.isAdmin) {
          history.push('/admin');
        } else if (!response.user.isAdmin) {
          history.push('/user');
        }
      })
      .catch((err) => {
        err;
      });
  }

  render() {
    const {
      firstName, lastName, email, department, password, passwordCheck,
    } = this.state;
    const input = {
      firstName,
      lastName,
      email,
      department,
      password,
      passwordCheck,
    };
    return (
      <React.Fragment>
        <SignUpForm
          value={input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

SignUpFormContainer.propTypes = {
  signUpUserRequest: PropTypes.func.isRequired,
};
