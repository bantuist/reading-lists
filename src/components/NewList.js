import React, { Component } from 'react';

// import './Lists/Lists.css';

class NewList extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log(this);
    const name = this.input.value;

    this.props.onAddList(name);
    this.input.value = '';
  }
  render() {
    return (
      <div className="new-list-container">
        <form className="new-list-form" onSubmit={(event) => this.handleSubmit(event)}>
          <input
            className="new-list-input"
            ref={(input) => this.input = input}
            type="text"
            placeholder="Create a new list"
          />
        </form>
      </div>
    );
  }
}

export default NewList;
