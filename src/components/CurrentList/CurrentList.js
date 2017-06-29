import React, { Component } from 'react';
import base from '../../rebase';
import { post } from '../../api';
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
  _checkBook(newBook) {
    let { currentList } = this.state;
    let books = {}; // Set to empty object in case there are no books on currentList

    if (currentList.books) {
      books = currentList.books;
    }

    if (books[`${newBook.id}`]) {
      // TODO: notify if duplicate book
      console.log('Already added');
      return undefined;
    } else {
      books[`${newBook.id}`] = newBook;
      currentList.books = books;
      currentList.bookCount++;
      return currentList;
    }
  }
  addBook(newBook) {
    const updatedList = this._checkBook(newBook);
    console.log(updatedList);
    if (updatedList) {
      post(updatedList);
    }
  }
  removeBook(bookId) {
    const { currentList } = this.state;
    const { books } = currentList;
    delete books[`${bookId}`];
    currentList.bookCount--;

    post(currentList);
  }
  updateBook(book) {
    const { currentList } = this.state;

    if (book.isRead) {
      currentList.books[`${book.id}`].isRead = false;
      currentList.doneCount--;
    } else {
      currentList.books[`${book.id}`].isRead = true;
      currentList.doneCount++;
    }
    
    post(currentList);
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

export default CurrentList;
