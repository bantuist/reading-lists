import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuidv1 from 'uuid/v1';
import { Link } from 'react-router-dom';
import base from '../../rebase';
import NewList from './../NewList';
import EditList from './../EditList/EditList';
import './Lists.css';
class Lists extends Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      editing: false,
      click: null,
    }
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  componentWillMount() {
    // Update local state props whenever base prop changes
    base.bindToState('/', {
      context: this,
      state: 'lists',
      asArray: false,
    });
  }
  // TODO
  moveCaretAtEnd(event) {
    var temp_value = event.target.value
    event.target.value = ''
    event.target.value = temp_value
  }
  addList(name) {
    const { lists } = this.state;
    const list = Object.keys(lists).filter((key) => {
      const list = lists[key];
      return list.name === name;
    });
    console.log(list);
    if (!list.length) {
      const id = uuidv1();
      const createdAt = Date.now();
      console.log(id);
      base.post(`${id}`, {
        data: { name, id, createdAt, bookCount: 0, doneCount: 0 },
        context: this,
        then: () => {
          console.log(`Posted ${id} ${name}`);
        }
      });
    } else {
      console.log('Duplicate list');
    }
  }
  removeList(id) {
    base.remove(id).then(() => {
      console.log(`Removed ${id}`);
    }).catch(error => {
      console.log('error', error);
    });
  }
  // handleChange(event) {
  //   console.log(event.target.value);
  // }
  handleKeyDown(event, id) {
    // const escape = 27;
    const enter = 13;

    // if (event.which === escape) {
      // this.setState({editText: this.props.todo.title});
      // this.props.onCancel(event);
    // } 
    if (event.which === enter) {
      this.handleSubmit(event, id);
    }
  }
  handleDoubleClick(event) {
    console.log(event);
  }
  handleSubmit(event, id) {
    // event.preventDefault();
    const name = event.target.value;
    this.setState({ editing: false });

    base.update(`${id}`, {
      data: { name: name },
      then(err) {
        if (!err) {
          console.log(`Updated ${id} ${name}`);
        }
      }
    });
  }
  // TODO: focus editing input element
  editList(id, name) {
    this.setState({ editing: id });
    const listNode = ReactDOM
      .findDOMNode(this)
      .querySelector(`.list-item-edit[data-id='${id}']`
     );
    // this.moveCaretAtEnd(listNode);
    // focus, select text
  }
  render() {
    let { lists } = this.state;
    // Sort lists
    lists = Object.keys(this.state.lists).sort((a, b) => {
      return (lists[a]['createdAt'] < lists[b]['createdAt']);
    });

    // Map and render lists
    lists = lists.map(key => {
    const list = this.state.lists[key];
    const { id, name } = this.state.lists[key];

    // Check if editing list
    const { editing } = this.state;
    let listItemEdit = 'list-item-edit';
    let removeClassName = 'remove';
    if (editing === id) {
      listItemEdit += ' editing';
      removeClassName += ' show';
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
              <h2 className="list-name">{name}</h2>
            </Link>
              <button className="update" onClick={() => this.editList(id, name)} />
              <button className={removeClassName} onClick={() => this.removeList(id)} />
            <EditList />
            <input
              autoFocus
              className={listItemEdit}
              data-id={id}
              defaultValue={name}
              onKeyDown={(event) => this.handleKeyDown(event, id)}
              onFocus={this.moveCaretAtEnd}
              onBlur={(event) => this.handleSubmit(event, id)}
            />
          </li>
        </div>
      );
    });

    return (
      <div className="wrapper">
        <ul className="list">
          <NewList onAddList={this.addList}/>
          {lists}
        </ul>
      </div>
    );
  }
}

export default Lists;