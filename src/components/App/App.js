import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import CurrentList from '../CurrentList/CurrentList';
import ReadingLists from '../ReadingLists/ReadingLists';

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
            <div className="col nav">
              <ul className="nav-list">
                <li>
                  { /* TODO: Pass history to link through state? */}
                  <Link className="Reading-lists" to={{
                    pathname: "/",
                    state: { message: 'from App.js' }
                  }}>
                    <h1>{this.state.currentList}</h1>
                  </Link>
                </li>
              </ul>
            </div>

            <Route exact path="/" component={ReadingLists} />
            <Route path="/current-list" component={CurrentList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
