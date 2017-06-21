import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import ReadingList from './components/ReadingList';
// import Profile from './components/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Search />
          <div className="col">
            <ul className="Nav">
              <li><Link to="/">Profile</Link></li>
              <li><Link to="/reading-list">Reading List</Link></li>
            </ul>
          </div>

          {/*<Route exact path="/" component={Profile} />*/}
          <Route path="/reading-list" component={ReadingList} />
        </div>
      </Router>
    );
  }
}

export default App;
