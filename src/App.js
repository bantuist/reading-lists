import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import base from './rebase';
import './App.css';
import CurrentList from './components/CurrentList/CurrentList';
import Lists from './components/Lists/Lists';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentList: 'Reading Lists',
      lists: {},
      // hovering: false,
    };

    // this.handleMouseOver = this.handleMouseOver.bind(this);
    // this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentWillMount() {
    // Update local state props whenever base prop changes
    base.bindToState('lists', {
      context: this,
      state: 'lists',
      asArray: true,
    });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  // handleMouseOver(event) {
  //   this.setState({ hovering: true });
  // }
  // handleMouseOut() {
  //   this.setState({ hovering: false });
  // }
  render() {
    const { list, hovering } = this.state;
    let navClassName = 'col nav';
    if (hovering) {
      navClassName += ' hovering';
    }

    return (
      <div>
        <Router>
          <div className="App">
            <div className={navClassName}>
              <ul className="nav-list">
                <li>
                  <Link className="Home" to="/">
                    <h1 
                      onMouseOver={this.handleMouseOver}
                      onMouseOut={this.handleMouseOut}
                    >{this.state.currentList}</h1>
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
