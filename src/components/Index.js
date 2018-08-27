import React from 'react';
import '../styles/App.scss';

const index = () => (
  <div className="row " id="header">
    <div className="col-6 maintenance-box">
      <a href="index.html">
        <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/256/maintenance-icon.png" alt="logo" />
      </a>
    </div>
    <div className="col-6 flex-container">
      <div className="nav">
        <nav>
          <ul className="rform">
            <form id="signin-form" className="one" action="">
              <li className="hide2">Sign In</li>
              <li>
                <div className="email">
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <input type="email" id="signin" placeholder="Enter Email" name="email" required />
                </div>
              </li>
              <li>
                <div className="psw">
                  <label htmlFor="password">
                    <strong>Password</strong>
                  </label>
                  <input type="password" id="psw" placeholder="Enter Password" name="password" required />
                </div>
              </li>
              <button type="submit">
                  Login
              </button>
            </form>
          </ul>
        </nav>
      </div>
    </div>
    <div id="display" className="alert col-12">
      <p id="alert" />
    </div>
    <div className="row ">
      <div className="col-6">
        <div className="col-12">
          <div className="col-8 text">
            <h2 className="col-3 p">Welcome to the Maintenance Tracker Site!</h2>
            <h3 className="col-2 p">Here you have the priviledge of reporting to us on any issue concerning the management of the company's equipment</h3>
            <h3 className="col3 p">If you notice any damage, please do report early to prevent worse damages</h3>
          </div>
        </div>
      </div>
      <div className="col-6 allbody three">
        <h1>Create a new account</h1>
        <p>It's free and always will be.</p>
        <form className="form menu" id="signup-form">
          <div className="container">
            <label htmlFor="firstName">
              <b>First Name</b>
            </label>
            <input type="text" id="firstName" placeholder="Enter First Name" name="firstName" required />

            <label htmlFor="lastName">
              <b>Last Name</b>
            </label>
            <input type="text" id="lastName" placeholder="Enter Last Name" name="lastName" required />

            <label htmlFor="department">
              <b>Department</b>
            </label>
            <input type="text" id="department" placeholder="Department" name="department" required />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input type="email" id="email" placeholder="Enter email" name="email" required />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input type="password" id="password" placeholder="Enter Password" name="password" required minLength="5" maxLength="20" />

            <label htmlFor="passwordCheck">
              <b>Confirm Password</b>
            </label>
            <input type="password" id="passwordCheck" placeholder="Confirm Password" name="passwordCheck" required minLength="5" maxLength="20" />

            <button type="submit">
                Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
export default index;
