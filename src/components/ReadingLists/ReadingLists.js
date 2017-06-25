import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { addList, removeList, updateList } from '../edit-lists';
import base from '../../rebase';
import ReadingList from '../ReadingList/ReadingList';
import NewList from './../NewList';
import './ReadingLists.css';

class ReadingLists extends Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      editing: false,
      notification: false,
      message: ''
    }

    this.addList = this.addList.bind(this);
    this.editList = this.editList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.updateList = this.updateList.bind(this);
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
    console.log('UPDATE LIST', this);
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
    // TODO separate refs to focus input: ref={(input) => this.input = input} why doesn't this refer to a unique input in a list?
    // listNode.focus();
  }
  sortLists(lists) {
    return Object.keys(this.state.lists).sort((a, b) => {
      return (lists[a]['createdAt'] < lists[b]['createdAt']);
    });
  }

  render() {
      let { lists, editing, notification, message } = this.state;
      let notifyClassName = 'notify';
      lists = this.sortLists(lists);
      
      // Map and render lists
      lists = lists.map(key => {
      const list = this.state.lists[key];
      const { id } = list;

      return (
        <ReadingList 
          key={id}
          list={list}
          notifyClassName={notifyClassName}
          editing={editing}
          notification={notification}
          message={message}
          onEditList={this.editList}
          onRemoveList={this.removeList}
          onUpdateList={this.updateList}
        />
      );
    });

    // New list notifications
    if (notification === 'duplicate' || notification === 'blank') {
      notifyClassName += ' duplicate';
    }

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

export default ReadingLists;