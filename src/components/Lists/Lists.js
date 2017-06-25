import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { addList, removeList, updateList } from '../modify-lists';
import base from '../../rebase';
import NewList from './../NewList';
import './Lists.css';

class Lists extends Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      editing: false,
      notification: false,
      message: ''
    }

    this.addList = this.addList.bind(this);
  }
  componentWillMount() {
    // Update local state props whenever base prop changes
    base.bindToState('/', {
      context: this,
      state: 'lists',
      asArray: false,
    });
  }
  // componentWillUnmount(){
  //   base.removeBinding(this.ref);
  // }
  addList(name) {
    const { lists } = this.state;
    const list = Object.keys(lists).filter((key) => {
      return lists[key].name === name;
    });

    if (list.length) {
      this.setState({ notification: 'duplicate', message: 'List already exists' });
      setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    } else if (!name) {
      // TODO extract notifications
      this.setState({ notification: 'blank', message: 'List name can\'t be blank' });
      setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    } else {
      addList(name, this.state.lists);
    }
  }

  // Refactor
  updateList(event, id) {
    const name = event.target.value;
    if (!name) {
      this.setState({ notification: 'blank', message: 'List name can\'t be blank' });
      setTimeout(() => {
        this.setState({ notification: false });
      }, 2000);
    } else {
      updateList(name, id);
      this.setState({ editing: false });
    }
  }
  removeList(id) {
    removeList(id);
  }
  handleKeyDown(event, id) {
    const enter = 13;
    if (event.which === enter) {
      this.updateList(event, id);
    }
  }
  editList(id, name) {
    this.setState({ editing: id });
    let listNode = ReactDOM
      .findDOMNode(this)
      .querySelector(`.list-item-edit[data-id='${id}']`
     );
    // Move cursor to end
    // const tempValue = name;
    listNode.value = '';
    // listNode.value = tempValue;
    // FIXME
    // listNode.focus();
  }
  render() {
    let { lists, notification, message } = this.state;
    // Sort lists
    lists = Object.keys(this.state.lists).sort((a, b) => {
      return (lists[a]['createdAt'] < lists[b]['createdAt']);
    });

    let notifyClassName = 'notify';
    if (notification === 'duplicate' || notification === 'blank') {
      notifyClassName += ' duplicate';
    }
    // Map and render lists
    lists = lists.map(key => {
    const list = this.state.lists[key];
    const { id, name } = this.state.lists[key];

    // Check if editing list
    const { editing } = this.state;
    let listItemEdit = 'list-item-edit';
    let removeClassName = 'remove';
    // Refactor
    if (editing === id) {
      listItemEdit += ' editing';
      removeClassName += ' show';
      if (notification === 'blank') {
        notifyClassName += ' blank';
      } 
    }
    
      // TODO separate refs to focus input: ref={(input) => this.input = input} why doesn't this refer to a unique input in a list?
      // onChange={(event) => this.handleChange(event)}
      // state: { readingList: readingList },
      // TODO XXX: Pass books as props to CurrentList Link
      return (
        <div className="list-item-container" key={id}>
          <li className="list-item">
            <Link 
              to={{ 
              pathname: '/current-list', 
              state: { currentList: this.state.lists[key] }
              }}
              className='list-view'
            >
              <h2 className="list-name">{name} ({list.bookCount})</h2>
            </Link>
              <button className="update" onClick={() => this.editList(id, name)} />
              <button className={removeClassName} onClick={() => this.removeList(id)} />
            {/*<EditList />*/}
            <input
              autoFocus
              placeholder="Enter a new name"
              className={listItemEdit}
              defaultValue={name}
              data-id={id}
              onKeyDown={(event) => this.handleKeyDown(event, id)}
              onFocus={this.moveCaretAtEnd}
              onBlur={(event) => this.updateList(event, id)}
            />
          </li>
        </div>
      );
    });

    console.log(notifyClassName, message);
    return (
      <div className="wrapper">
        <ul className="list">
          <NewList onAddList={this.addList}/>
          <div className={notifyClassName}>{message}</div>
          {lists}
        </ul>
      </div>
    );
  }
}

export default Lists;