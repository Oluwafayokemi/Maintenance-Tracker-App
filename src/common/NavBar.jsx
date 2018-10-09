import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/App.scss';
import { logOutAction } from '../actions/logIn.action';

export class NavBar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      show: true,
      screenWidth: window.screen.width > 769,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  toggleNavBar = () => () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.screen.width > 769,
    });
  };

  render() {
    const { isUser, logOutAction: logOut, auth } = this.props;
    const { show, screenWidth } = this.state;
    let screenDisplay = false;
    if (show) screenDisplay = true;
    if (screenWidth) screenDisplay = true;
    if (!show && screenWidth) screenDisplay = false;
    return (
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
                  <button onClick={this.toggleNavBar()} >
                    <i id="fas" className="fas fa-bars" />
                  </button>
                </div>
                {
                  screenDisplay ?
                    (
                      <ul className="ul">
                        <li>
                          {isUser ? <Link to="/user"> Home </Link> : <Link to="/admin"> Home </Link>}
                        </li>
                        <li>
                          {isUser ? <Link to="/NewRequest"> New Request </Link> : ''}
                        </li>
                        <li>
                          {auth ? '' : <Link to="/"> Sign In </Link>}
                        </li>
                        <li id="logoutBtn">
                          <Link to="/" onClick={logOut} >Log Out </Link>
                        </li>
                        <div className="right" />
                      </ul>
                  )
                    : ''
                }
              </nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
NavBar.propTypes = {
  isUser: PropTypes.bool,
  logOutAction: PropTypes.func.isRequired,
  auth: PropTypes.shape({}),
};

NavBar.defaultProps = {
  isUser: true,
  auth: {},
};

export default connect(null, { logOutAction })(NavBar);

