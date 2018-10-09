import React from 'react';
import history from '../../../util/history';
import LoginForm from './LoginForm';

export default class loginFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { logInUserRequest } = await this.props;
    const loginbtn = document.querySelector('#login-btn');
    loginbtn.textContent = 'loading...';
    const response = await logInUserRequest(this.state);
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
    const { email, password } = this.state;
    const input = {
      email,
      password,
    };
    return (
      <React.Fragment>
        <LoginForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={input}
        />
      </React.Fragment>
    );
  }
}

