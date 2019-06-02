import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Layout from './components/layout/index';
import NotFound from './components/error/notFound';
import NotPermission from './components/error/notPermission';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="appWrap">
          <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
                <Route path="/app" component={Layout} />
                <Route exact path="/401" component={NotPermission} />
                <Route path="/404" component={NotFound} />
                {/* <Route path="/login" component={Login} /> */}
                <Route component={NotFound} /> */}
            </Switch>
          </Router>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
