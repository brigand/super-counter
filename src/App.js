import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import storage from './utils/storage';
import CounterTypes from './components/CounterTypes';
import SingleCounter from './components/SingleCounter';
import './App.css';

let basePath = '/';

if (/github\.io/.test(location.hostname)) {
  basePath = `/${location.pathname.split('/')[1] || ''}`;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCounter: null,
    };
  }

  render() {
    return (
      <div className="App">
        <Router basename={basePath}>
          <Switch>
            <Route path="/counter/:id" component={SingleCounter} />
            <Route path="/" exact render={this.renderCounters.bind(this)} />
          </Switch>
        </Router>
      </div>
    );
  }

  renderCounters() {
    return (
      <CounterTypes
        onNewCounter={() => {
          const counters = storage.get().counters.concat([{
            name: `New counter`,
            points: [],
            id: Math.random().toString(),
          }]);
          storage.set({
            ...storage.get(),
            counters,
          });
        }}
      />
    );
  }
}

export default App;
