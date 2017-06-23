import React, { Component } from 'react';
import base from '../../rebase';
import FontAwesome from 'react-fontawesome';
import Search from '../Search/Search';
import './CurrentList.css';

class CurrentList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.currentList);
    this.state = {
      currentList: this.props.location.state.currentList
    }
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }
  componentWillMount() {
    const { id } = this.state.currentList;
    console.log(id);

    // Update local state props whenever base prop changes
    base.bindToState(`/${id}`, {
      context: this,
      state: 'currentList',
      asArray: false,
    });
  }
  addBook(listId, newBook) {
    console.log(listId, newBook);
    base.post(`${listId}/books/${newBook.id}`, {
      data: { ...newBook },
      context: this,
      then: () => {
        console.log('Posted to Firebase');
      }
    });
  }
  removeBook(event, listId, bookId) {
    console.log(listId, bookId);
    base.remove(`/${listId}/books/${bookId}`).then(() => {
      console.log('Removed from Firebase');
    }).catch(error => {
      console.log('error', error);
    });
  }
  updateBook(listId, book) {
    const bookId = book.id;
    let isRead = true;

    if (book.isRead) {
      isRead = false;
    }

    base.update(`/${listId}/books/${bookId}`, {
      data: { isRead },
      then(err) {
        if (!err) {
          console.log(`Updated ${listId} ${bookId}`);
        }
      }
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
    // console.log(this.props.location.state);
    let { currentList } = this.state;
    let books = [];
    if (currentList.books) {
      books = Object.keys(currentList.books).map(key => {
        const book = currentList.books[key];
        const listId = currentList.id;
        const { imageLinks, title, authors, amount, id, isRead } = book;
        let checkBook = 'check-square-o';
        if (isRead) {
          checkBook = 'check-square';
        }

        return (
          <li className="Book-list-item" key={id}>
            <div className="image-container">
              <img src={imageLinks} alt="suggestion" />
            </div>
            <div className="Book-details">
              <h3 className="Book-title">{title}</h3>
              <p className="Book-author">{authors}</p>
              {typeof amount === 'number' &&
                <p className="Book-amount">${amount}</p>}
              <p className="Book-id">{id}</p>
            </div>
            <FontAwesome 
              name={checkBook}
              onClick={() => this.updateBook(listId, book)} 
            />
            <button className="Book-remove" onClick={event => this.removeBook(event, listId, id)}>X</button>
          </li>
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
