import React from 'react';
import '../styles/App.scss';
import history from '../util/history';

export default class SignInForm extends React.PureComponent {
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.logInUserRequest(this.state)
      .then((response) => {
        console.log(response.user.user.isAdmin)
        if (response.user.user.isAdmin) {
          history.push('/admin');
        } else if (!response.user.user.isAdmin) {
          history.push('/user');
        }
      })
      .catch((err) => {
        err;
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-6 flex-container">
          <div className="nav">
            <nav>
              <ul className="rform">
                <form id="signin-form" className="one" onSubmit={this.handleSubmit}>
                  <li className="hide2">Sign In</li>
                  <li>
                    <div className="email">
                      <label htmlFor="email">
                        <strong>Email</strong>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </li>
                  <li>
                    <div className="psw">
                      <label htmlFor="password">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </li>
                  <button type="submit" value="submit">
                    Login
                  </button>
                </form>
              </ul>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

