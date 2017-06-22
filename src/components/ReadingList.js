import React, { Component } from 'react';
import base from './../rebase';
import './../App.css';

class ReadingList extends Component {
  constructor() {
    super();
    this.state = {
      readingList: []
    }
    this.removeBook = this.removeBook.bind(this);
  }
  componentWillMount() {
    console.log('componentWillMount');
    // Update local state props whenever base prop changes
    base.bindToState('books', {
      context: this,
      state: 'readingList',
      asArray: true,
    });
  }
  removeBook(event, id) {
    base.remove(`books/${id}`).then(() => {
      console.log('Removed from Firebase');
    }).catch(error => {
      console.log('error', error);
    });
  }
  // bears endpoint currently holds the object { name: 'Bill', type: 'Grizzly' }
  
  // base.update('bears', {
  //   data: {name: 'George'}
  // }).then(() => {
  //   Router.transitionTo('dashboard');
  // }).catch(err => {
  //   //handle error
  // });

  render() {
    const readingList = this.state.readingList.map(book => {
    // const readingList = this.state.readingList.map(book => {
      const { imageLinks, title, authors, amount, id } = book;
      // vs. const { imageLinks, title, authors, amount, id } = this.props.location.state.readingList;
      return (
        <li className="col" key={id}>
          <img src={imageLinks} alt="suggestion" />
          <div className="title">{title}</div>
          <div className="author">{authors}</div>
          {typeof amount === 'number' &&
            <div className="amount">{amount}</div>}
          <div className="id">{id}></div>
          <button onClick={event => this.removeBook(event, id)}>X</button>
        </li>
      );
    });

    return (
      <div className="col">
        <ul className="volume-details">
          {readingList}
        </ul>
      </div>
    );
  }
}

export default ReadingList;
