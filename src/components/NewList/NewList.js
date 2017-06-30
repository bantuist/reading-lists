import React from 'react';

function NewList(props) {
  function addList(event) {
    event.preventDefault();
    const name = inputRef.value;
    props.onAddList(name);
    inputRef.value = '';
  }

  let inputRef;

  return (
    <div className="new-list-container">
      <form className="new-list-form" onSubmit={(event) => addList(event)}>
        <input
          className="new-list-input"
          ref={(input) => inputRef = input}
          type="text"
          placeholder="Create a new list"
        />
      </form>
    </div>
  );
}

export default NewList;
