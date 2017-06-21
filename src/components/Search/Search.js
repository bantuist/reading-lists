import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './Search.css'

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
    console.log(regex.test(title), title);
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

/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  suggestion = suggestion.volumeInfo;
  return (
    <span>{suggestion.title} &mdash; {suggestion.authors}</span>
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
      isLoading: false
    };
    
    this.lastRequestId = null;
  }
  
  loadSuggestions(value) {
    const fetchURL = baseURL + value + '&key=AIzaSyDMQZtKd597YQ0nrtVdz6zsLB_YPzB49sU';

    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });

    fetch(fetchURL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          isLoading: false,
          suggestions: getMatchingBooks(value, responseData)
        });
      });
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
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}

export default Search;