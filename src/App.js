import React from 'react';
import Home from './components/Home';
import Admin from './components/AdminDashboard';
import User from './components/UserDashboard';
import NewRequest from './components/NewRequest';
import Header from './components/Header';
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
