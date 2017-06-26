import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

function CurrentListItem({ book = [], onUpdateBook, onRemoveBook }) {
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
        onClick={() => onUpdateBook(book)} 
      />
      <button 
        className="Book-remove" 
        onClick={() => onRemoveBook(id)}
        >X</button>
    </li>
  );
}

CurrentListItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.number, 
      PropTypes.string]
    ),
    imageLinks: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired
  }),
}

export default CurrentListItem;