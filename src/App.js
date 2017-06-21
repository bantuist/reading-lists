import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import ReadingList from './components/ReadingList';
// import Profile from './components/Profile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      readingList: [],
    }

    this.saveToReadingList = this.saveToReadingList.bind(this);
  }
  saveToReadingList(newBook) {
    const { readingList } = this.state;
    // console.log(readingList);
    readingList.push(newBook);
    // console.log(readingList);
    this.setState({
      readingList: readingList,
    })
    // Save to Firebase
    console.log('Saved:', this.state.readingList);
  }
  render() {
    const { readingList } = this.state;
    console.log(readingList);
    return (
      <Router>
        <div className="App">
          <Search onSaveToReadingList={this.saveToReadingList}/>
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
