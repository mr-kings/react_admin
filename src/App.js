import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Button,
  Drawer
} from 'antd';

class App extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          < Button type = "primary"
          onClick = {
            this.showDrawer
          }> Primary </Button>
        </header>
        <div className="App-body">
        < Button type = "primary"
        onClick = {
          this.showDrawer
        } > Primary </Button>
          <Drawer
          title = "Basic Drawer"
          placement = "right"
          closable = {
            false
          }
          onClose = {
            this.onClose
          }
          visible = {
              this.state.visible
            } >
            <p> Some contents... </p>
            <p > Some contents... </p>
            <p> Some contents... </p>
            </Drawer>
        </div>
      </div>
    );
  }
}

export default App;
