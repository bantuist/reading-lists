import React from 'react';
import './Suggestion.css';

function Suggestion(props) {
  const { imageLinks, title, authors, amount, id } = props.suggestion;
  
  return (
    <div className="Suggestion" key={id}>
      <div className="book-thumbnail-container">
        <img src={imageLinks} alt="suggestion" />
      </div>
      <div className="book-details">
        <div className="title">{title}</div>
        <div className="author">{authors}</div>
        {typeof amount === 'number' &&
          <div className="amount">{amount}</div>}
        <div className="id">{id}</div>

      </div>
    </div>
  );
}

export default Suggestion;