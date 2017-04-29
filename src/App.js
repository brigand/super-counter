import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
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
          <div>
            {this.renderCounters()}
            <Route path="/counter/:id" children={({match, ...rest}) => {
              return (
                <SingleCounter open={!!match} match={match} {...rest} />
              );
            }} />
          </div>
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
