import React, { Component } from 'react';
import './../App.css';

class ReadingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // readingList: props.location.state.readingList
    }
  }
  // load from firebase ref
  render() {
    const readingList = this.props.location.state.readingList.map(book => {
    // const readingList = this.state.readingList.map(book => {
      const { imageLinks, title, authors, amount, id } = book;
      // vs. const { imageLinks, title, authors, amount, id } = this.props.location.state.readingList;
      console.log(title);
      return (
        <li key={id}>
          <img src={imageLinks} alt="suggestion" />
          <div className="title">{title}</div>
          <div className="author">{authors}</div>
          {typeof amount === 'number' &&
            <div className="amount">{amount}</div>}
          <div className="id">{id}></div>
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
