import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CurrentList from '../CurrentList/CurrentList';
import ReadingLists from '../ReadingLists/ReadingLists';

import 'normalize.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentList: 'Reading Lists'
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Link className="Reading-lists" to={{
              pathname: "/",
              state: { message: 'from App.js' }
            }}>
              <div className="col nav">
                <ul className="nav-list">
                  <li>
                    { /* TODO: Pass history to link through state? */}
                      <div className="header">
                        <h1 className="title">{this.state.currentList}</h1>
                      </div>
                  </li>
                </ul>
              </div>
            </Link>

            <Route exact path="/" component={ReadingLists} />
            <Route path="/current-list" component={CurrentList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
