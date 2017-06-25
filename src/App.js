import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import base from './rebase';
import './App.css';
import CurrentList from './components/CurrentList/CurrentList';
import Lists from './components/Lists/Lists';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentList: 'Reading Lists'
    };
  }

  // componentWillMount() {
  //   // Update local state props whenever Firebase props change
  //   base.bindToState('/lists', {
  //     context: this,
  //     state: 'lists',
  //     asArray: true,
  //   });
  // }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <div className="col nav">
              <ul className="nav-list">
                <li>
                  <Link className="Reading-lists" to={{
                    pathname: "/",
                    state: { message: 'from App.js' }
                  }}>
                    <h1>{this.state.currentList}</h1>
                  </Link>
                </li>
              </ul>
            </div>

            <Route exact path="/" component={Lists} />
            <Route path="/current-list" component={CurrentList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
