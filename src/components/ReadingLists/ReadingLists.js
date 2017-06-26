import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { add, remove, update } from '../edit-lists';
import { filterList } from '../util';
import base from '../../rebase';
import ReadingList from '../ReadingList/ReadingList';
import NewList from '../NewList/NewList';
import './ReadingLists.css';

class ReadingLists extends Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      notifications: {
        editing: false,
        notify: false,
        message: ''
      }
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
    const list = filterList(name, lists);

    // Check for duplicate list and blank name before adding new list
    if (list.length) {
      this.setState({ 
        notifications: { 
          notify: 'duplicate', 
          message: 'List already exists' 
        } 
      });
      setTimeout(() => {
        this.setState({ notifications: { notify: false } });
      }, 2000);
    } else if (!name) {
      this.setState({ notifications: { notify: 'blank' , message: 'List name can\'t be blank' } });
      setTimeout(() => {
        this.setState({ notifications: { notify: false } });
      }, 2000);
    } else {
      add(name);
    }
  }

  // Refactor
  updateList(event, id) {
    console.log('update');
    const name = event.target.value;

    if (!name) {
      this.setState({ 
        notifications: {
          notify: 'blank',
          message: 'List name can\t be blank'
        }
      }); 
      setTimeout(() => {
        this.setState({ notifications: { notify: false } });
      }, 2000);
    } else {
      update(name, id);
      this.setState({ notifications: { editing: false } });
    }
  }
  removeList(id) {
    remove(id);
  }
  editList(id, name) {
    this.setState({ notifications: { editing: id } });
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
  _sortLists(lists) {
    return Object.keys(this.state.lists).sort((a, b) => {
      return (lists[a]['createdAt'] < lists[b]['createdAt']);
    });
  }

  render() {
      let { lists, notifications } = this.state;
      let notifyClassName = 'notify';
      lists = this._sortLists(lists);
      
      // Map and render lists
      lists = lists.map(key => {
      const list = this.state.lists[key];
      const { id } = list;

      return (
        <ReadingList 
          key={id}
          list={list}
          notifications={notifications}
          onEditList={this.editList}
          onRemoveList={this.removeList}
          onUpdateList={this.updateList}
        />
      );
    });

    // New list notifications
    if (notifications.notify === 'duplicate' || notifications.notify === 'blank') {
      notifyClassName += ' duplicate';
    }

    return (
      <div className="wrapper">
        <ul className="list">
          <NewList onAddList={this.addList}/>
          <div className={notifyClassName}>{notifications.message}</div>
          {lists}
        </ul>
      </div>
    );
  }
}

export default ReadingLists;