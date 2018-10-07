import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/App.scss';

const NavBar = ({ isUser }) => (
  <React.Fragment>
    <div className="row header" id="header">
      <div className="maintenance-box">
        <Link to="/">
          <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/256/maintenance-icon.png" alt="logo" />
        </Link>
      </div>
      <div className="nav">
        <div className="col-12">
          <nav>
            <div className="hide collapsible">
              <i className="fas fa-bars" />
            </div>

            <ul className="ul">
              <li>
                {isUser ? <Link to="/user"> Home </Link> : <Link to="/admin"> Home </Link> }
              </li>
              <li>
                {isUser ? <Link to="/NewRequest"> New Request </Link> : ''}
              </li>
              <li>
                <Link to="/"> Sign In </Link>
              </li>
              <li id="logoutBtn">
                <Link to="/"> Log Out </Link>
              </li>
              <div className="right" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </React.Fragment>
);

NavBar.propTypes = {
  isUser: PropTypes.bool,
};

NavBar.defaultProps = {
  isUser: true,
};

export default NavBar;
