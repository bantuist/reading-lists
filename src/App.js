import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import base from './rebase';
import './App.css';
import Search from './components/Search/Search';
import ReadingList from './components/ReadingList';
// import Profile from './components/Profile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      readingList: {},
    };
  }

  componentWillMount() {
    // Update local state props whenever base prop changes
    base.bindToState('books', {
      context: this,
      state: 'readingList',
      asArray: true,
    });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  render() {
    const { readingList } = this.state;
    return (
      <Router>
        <div className="App">
          <Search readingList={readingList} />
          <div className="col">
            <ul className="Nav">
              <li><Link to="/">Profile</Link></li>
              <li><Link to={{
                pathname: "/reading-list",
                state: { readingList: readingList },
              }}>Reading List</Link></li>
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
