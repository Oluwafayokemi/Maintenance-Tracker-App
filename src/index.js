import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Admin from './components/AdminDashboard';
import NewRequest from './components/NewRequest';
import User from './components/UserDashboard';
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
