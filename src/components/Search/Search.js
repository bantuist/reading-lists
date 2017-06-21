// TODO focusInputOnSuggestionClick
// console.log(process.env.REACT_APP_GOOGLE_BOOKS_API_KEY);
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
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
function getBookProps(suggestion) {
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
    imageLinks
  }
}
function getRequests() {
  let requests = localStorage.getItem('requests');
  if (typeof JSON.parse(requests) !== 'number') {
    requests = [];
  }
  return requests;
}
/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  suggestion = getBookProps(suggestion);
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  const bookProps = getBookProps(suggestion);
  return (
    <Suggestion suggestion={bookProps} />
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
    
    this.lastRequestId = null;
  }
  
  loadSuggestions(value) {
    const fetchURL = baseURL + value + '&filter=paid-ebooks&key=AIzaSyDMQZtKd597YQ0nrtVdz6zsLB_YPzB49sU';
    let { requests } = this.state;
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });

    if (value.length > 5) {
      fetch(fetchURL)
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            isLoading: false,
            suggestions: getMatchingBooks(value, responseData),
            requests: requests,
          });
        });
      requests++;
      localStorage.setItem('requests', requests);
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
    const newBook = getBookProps(suggestion);
    this.props.onSaveToReadingList(newBook);
  }
  render() {
    const { value, isLoading, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter a book title",
      value,
      onChange: this.onChange
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');
    
    return (
      <div className="Search">
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <div>{this.state.requests}</div>
      </div>
    );
  }
}

export default Search;