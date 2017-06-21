import React, { Component } from 'react';
// import { Glyphicon } from 'react-bootstrap';
import './Suggestion.css';

class Suggestion extends Component {
  render() {
    const { imageLinks, title, authors, amount, id } = this.props.suggestion;
    
    return (
      <div className="Suggestion" key={id}>
        <img src={imageLinks} alt="suggestion" />
        <div className="title">{title}</div>
        <div className="author">{authors}</div>
        {typeof amount === 'number' &&
          <div className="amount">{amount}</div>}
        <div className="id">{id}></div>
      </div>
    );
  }
}

export default Suggestion;