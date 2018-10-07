import React from 'react';

const SignUpForm = ({ handleChange, handleSubmit, value }) => (
  <React.Fragment>
    <div className="col-6 allbody three">
      <h1>Create a new account</h1>
      <p>Its free and always will be.</p>
      <form className="form menu" id="signup-form" onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="firstName">
            <b>First Name</b>
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            name="firstName"
            value={value.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            name="lastName"
            value={value.lastName}
            onChange={handleChange}
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
            value={value.department}
            onChange={handleChange}
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
            value={value.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            name="password"
            required
            minLength="5"
            maxLength="20"
            value={value.password}
            onChange={handleChange}
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
            value={value.passwordCheck}
            onChange={handleChange}
          />

          <button type="submit" value="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  </React.Fragment>
);

export default SignUpForm;
