import React from 'react';
import history from '../../../util/history';

export default class SignUpForm extends React.Component {
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
    const { signUp } = this.props;
    event.preventDefault();
    signUp(this.state)
    .then((response) => {
      if (response.user.isAdmin){
        history.push('/admin')
      }
      else if (!response.user.isAdmin) {
        history.push('/user')
      }
    })
    .catch((err) => {
      err
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="col-6 allbody three">
          <h1>Create a new account</h1>
          <p>Its free and always will be.</p>
          <form className="form menu" id="signup-form" onSubmit={this.handleSubmit}>
            <div className="container">
              <label htmlFor="firstName">
                <b>First Name</b>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="lastName">
                <b>Last Name</b>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName" value={this.state.lastName}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="department">
                <b>Department</b>
              </label>
              <input
                type="text"
                id="department"
                placeholder="Department"
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password" placeholder="Enter Password"
                name="password"
                required
                minLength="5"
                maxLength="20"
                value={this.state.password}
                onChange={this.handleChange}
              />

              <label htmlFor="passwordCheck">
                <b>Confirm Password</b>
              </label>
              <input
                type="password"
                id="passwordCheck"
                placeholder="Confirm Password"
                name="passwordCheck"
                required
                minLength="5"
                maxLength="20"
                value={this.state.passwordCheck}
                onChange={this.handleChange}
              />

              <button type="submit" value="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
