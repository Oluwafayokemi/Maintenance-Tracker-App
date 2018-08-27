/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Index from './components/Index';
import Admin from './components/AdminDashboard';

ReactDOM.render(
  <Router>
    <div className="main">
      <Route exact path="/" component={App} />
      <Route path="/home" component={Index} />
      <Route path="/admin" component={Admin} />
    </div>
  </Router>,
  document.getElementById('index'),
);

