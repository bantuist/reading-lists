import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { post, remove, update } from '../../api';
import { filterList, buildList } from '../../utility';
import base from '../../rebase';
import ReadingList from '../ReadingList/ReadingList';
import NewList from '../NewList/NewList';
import './ReadingLists.css';
// import sampleLists from '../../sample-lists';

class ReadingLists extends Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      test: false,
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
  _sortLists(lists) {
    return Object.keys(this.state.lists).sort((a, b) => {
      return (lists[a]['createdAt'] < lists[b]['createdAt']);
    });
  }
  _notify(type) {
    if (type === 'blank') {
      this.setState({ 
        notifications: { 
          type: 'blank' , 
          message: 'List name can\'t be blank' 
        } 
      });
      setTimeout(() => {
        this.setState({ 
          notifications: { 
            type: '' 
          } 
        });
        console.log('blank');
      }, 2000);
    } else if (type === 'duplicate') {
      this.setState({ 
        notifications: { 
          type: 'duplicate', 
          message: 'List already exists' 
        } 
      });
      setTimeout(() => {
        this.setState({ notifications: { type: '' } });
        console.log('duplicate');
      }, 2000); 
    }
  }
  _checkList(name) {
    const { lists } = this.state;
    const currentList = filterList(name, lists);

    if (!name) {
      return this._notify('blank');
    } else if (currentList.length) {
      return this._notify('duplicate');
    } else {
      return buildList(name);
    }
  }
  editList(id, name) {
    this.setState({ notifications: { editing: id } });
    let listNode = ReactDOM.findDOMNode(this).querySelector(`.list-item-edit[data-id='${id}']`);
    listNode.value = '';

    // Move cursor to end
    // const tempValue = name;
    // listNode.value = tempValue;
    // FIXME
    // listNode.focus();
  }
  addList(name) {
    const newList = this._checkList(name);
    console.log(newList);
    if (newList) {
      post(newList);
    }
  }
  updateList(event, id) {
    const name = event.target.value;
    if (!name) return this._notify('blank');
    update(name, id);
    this.setState({ notifications: { editing: false } });
  }
  removeList(id) {
    remove(id);
  }

  render() {
      let { lists, notifications } = this.state;
      let notificationClassName = 'notify';
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
    if (notifications.type === 'duplicate' || notifications.type === 'blank') {
      notificationClassName += ' duplicate';
    }

    return (
      <div className="wrapper">
        <ul className="list">
          <NewList onAddList={this.addList}/>
          <div className={notificationClassName}>{notifications.message}</div>
          {lists}
        </ul>
      </div>
    );
  }
}

export default ReadingLists;