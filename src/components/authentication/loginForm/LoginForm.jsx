import React from 'react';
import PropTypes, { string } from 'prop-types';

const LoginForm = ({ handleChange, handleSubmit, value }) => (
  <React.Fragment>
    <div className="col-6 flex-container">
      <div className="nav">
        <nav>
          <ul className="rform">
            <form id="signin-form" className="one" onSubmit={handleSubmit}>
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
                    value={value.email}
                    onChange={handleChange}
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
                    value={value.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </li>
              <button type="submit" value="submit" id="login-btn">
                Login
              </button>
            </form>
          </ul>
        </nav>
      </div>
    </div>
  </React.Fragment>
);

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.shape({
    email: string,
    password: string,
  }).isRequired,
};

export default LoginForm;
