import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import base from '../../rebase';
import { addBook, removeBook, updateBook } from '../edit-books';
import CurrentListItem from '../CurrentListItem/CurrentListItem';
import Search from '../Search/Search';
import './CurrentList.css';


class CurrentList extends Component {
  constructor() {
    super();
    this.state = {
      currentList: {},
    }

    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }
  componentWillMount() {
    let id = '';
    if (this.props.location) {
      id = this.props.location.state.currentList.id;
    } 

    // Update local state props whenever base prop changes
    base.bindToState(`/${id}`, {
      context: this,
      state: 'currentList',
      asArray: false,
    });
  }
  addBook(newBook) {
    let { currentList } = this.state;
    addBook(newBook, currentList);
  }
  removeBook(bookId) {
    const { currentList } = this.state;
    removeBook(bookId, currentList);
  }
  updateBook(book) {
    const { currentList } = this.state;
    updateBook(book, currentList);
  }

  render() {
    let { currentList } = this.state;
    let books = [];
    
    if (currentList.books) {
      books = Object.keys(currentList.books).map(key => {
        const book = currentList.books[key];
        const { id } = book;
        
        return (
          <CurrentListItem
            key={id}
            book={book}
            onUpdateBook={this.updateBook}
            onRemoveBook={this.removeBook}
          />
        );
      });
    }

    return (
      <div className="Current-list">
        <Search 
          currentList={currentList} 
          onAddBook={this.addBook}
        />
        <ul className="Book-list">
          {books}
        </ul>
      </div>
    );
  }
}

// CurrentList.propTypes = {
//   id: PropTypes.string.isRequired
// }

export default CurrentList;
