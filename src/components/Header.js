import React from 'react';
import '../styles/App.scss';

const Header = ({ isUser }) => (
  <React.Fragment>
    <div className="row header" id="header">
      <div className="maintenance-box">
        <a href="admin.index.html">
          <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/256/maintenance-icon.png" alt="logo" />
        </a>
      </div>
      <div className="nav">
        <div className="col-12">
          <nav>
            <div className="hide collapsible">
              <i className="fas fa-bars" />
            </div>

            <ul className="ul">
              <li>
                <a href="admin.index.html">Home</a>
              </li>
              <li>
                {isUser ? <a href="admin.index.html">New Request</a> : ''}
              </li>
              <li>
                <a href="index.html">Sign In</a>
              </li>
              <li id="logoutBtn">
                <a href="index">Log Out</a>
              </li>
              <div className="right" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </React.Fragment>
);
export default Header;
