import React, { Component } from 'react';
import Index from './components/Index';
import Admin from './components/AdminDashboard';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Index />
        <Admin />
      </div>
    );
  }
}

export default App;
