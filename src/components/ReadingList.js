import React, { Component } from 'react';
import './../App.css';

const fakeBooks = [
  {volumeInfo: {title: 'The Catcher in the Rye', authors: "J. D. Salinger", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
];
class ReadingList extends Component {
  render() {
    const books = fakeBooks.map(book => {
      return (
        <li>
          <img 
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="thumbnail"
          />
          {book.volumeInfo.title}
          {book.volumeInfo.authors}
          Reading List
        </li>
      );
    });
    return (
      <div className="col">
        <ul>
        {books}
        </ul>
      </div>
    );
  }
}

export default ReadingList;
