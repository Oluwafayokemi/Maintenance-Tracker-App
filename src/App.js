import React from 'react';
import Home from './components/authentication/Home';
import Admin from './components/adminDashboard/AdminDashboard';
import User from './components/userDashboard/UserDashboard';
import NewRequest from './components/userDashboard/newRequest/NewRequestContainer';
import './styles/App.scss';

const App = () => (
  <React.Fragment>
    <Home />
    <Admin />
    <User />
    <NewRequest />
  </React.Fragment>
);

export default App;
