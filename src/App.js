import React, { Component } from 'react';
import Local from '../src/i18n/index';
import Router from '../src/routes/appRouter';
import './App.css';
class App extends Component {
  render() {
    return (
      <Local>
        <Router />
      </Local>
    );
  }
}

export default App;
