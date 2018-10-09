import React from 'react';
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

  handleSubmit = async (event) => {
    const { signUpUserRequest } = await this.props;
    event.preventDefault();
    const signUpbtn = document.querySelector('#signUp-btn');
    signUpbtn.textContent = 'loading...';
    const response = await signUpUserRequest(this.state);
    try {
      if (response.user.isAdmin) {
        return history.push('/admin');
      }
      return history.push('/user');
    } catch (err) {
      return err;
    }
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
