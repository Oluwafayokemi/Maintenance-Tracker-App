import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/authentication/Home';
import Admin from './components/adminDashboard/AdminDashboard';
import NewRequest from './components/userDashboard/newRequest/NewRequestContainer';
import User from './components/userDashboard/UserDashboard';
import App from './App';
import store from './rootReducer';
import history from './util/history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/header" component={App} />
        <Route path="/admin" component={Admin} />
        <Route path="/newRequest" component={NewRequest} />
        <Route path="/user" component={User} />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById('index'),
);
