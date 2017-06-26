import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { getRequests, setRequests } from '../util';
import Suggestion from '../Suggestion/Suggestion';
import './Search.css';

/* ---------- */
/*    Data    */
/* ---------- */

function getMatchingBooks(value, responseData) {
  // console.log(responseData);
  const volumes = responseData.items || [];
  // console.log(volumes);

  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  const regex = new RegExp('^' + escapedValue, 'i');
  return volumes.filter(volume => {
    const { title } = volume.volumeInfo;
    return regex.test(title)
  });
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function _getBookProps(suggestion) {
  const { volumeInfo, saleInfo, id } = suggestion;
  const { title, authors } = volumeInfo;
  const amount = saleInfo.listPrice ? saleInfo.listPrice.amount : 'NOT_FOR_SALE';
  let { imageLinks } = volumeInfo || '';
  if (imageLinks && imageLinks.thumbnail) {
    imageLinks = imageLinks.thumbnail;
  }
  // typeof imageLinks !== 'undefined'|| typeof imageLinks.thumbnail !== 'undefined'
  return {
    id,
    title,
    authors,
    amount,
    imageLinks,
    isRead: false,
  }
}
/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  suggestion = _getBookProps(suggestion);
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  const { imageLinks, title, authors, amount, id } = _getBookProps(suggestion);

  return (
    <Suggestion 
      imageLinks={imageLinks}
      title={title}
      authors={authors}
      amount={amount}
      id={id}
    />
  );
}
const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDMQZtKd597YQ0nrtVdz6zsLB_YPzB49sU	
class Search extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false,
      requests: getRequests(),
    };
  }
  
  loadSuggestions(value) {
    const fetchURL = baseURL + value + '&filter=paid-ebooks&key=AIzaSyDMQZtKd597YQ0nrtVdz6zsLB_YPzB49sU';
    let { requests } = this.state;
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });

    if (value.length > 5) {
      requests.count++;
      fetch(fetchURL)
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            isLoading: false,
            suggestions: getMatchingBooks(value, responseData),
            requests: requests,
          });
          setRequests(requests);
        });
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
    
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected = (event, { suggestion }) => {
    const newBook = _getBookProps(suggestion);
    // const { id } = this.props.currentList;
    this.props.onAddBook(newBook);
  }
  render() {
    const { currentList } = this.props;
    const { name, bookCount, doneCount } = currentList;
    const { value, isLoading, suggestions } = this.state;
    const inputProps = {
      placeholder: `Add a book to ${name}`,
      value,
      onChange: this.onChange
    };
    const status = (isLoading ? 'Loading...' : 'Search for a book');
    return (
      <div className="Search">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <div className="status">
          <span style={{paddingRight: '10px'}}>Requests: {this.state.requests.count}/1000</span>
          <span style={{paddingRight: '10px'}}>Books: {doneCount}/{bookCount} </span>
          {status}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onAddBook: PropTypes.func.isRequired
}
export default Search;