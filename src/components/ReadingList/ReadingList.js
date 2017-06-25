import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function handleKeyDown(props, event, id) {
  // TODO: Add escape edit 
  const enter = 13;
  if (event.which === enter) {
    props.onUpdateList(event, id);
  }
}
function ReadingList(props) {
  let { list, editing, notification, notifyClassName } = props;
  const { id, name } = list;
  let listItemEdit = 'list-item-edit';
  let removeClassName = 'remove';

  // Toggle edit list and notifications
  if (editing === id) {
    listItemEdit += ' editing';
    removeClassName += ' show';
    if (notification === 'blank') {
      notifyClassName += ' blank';
    } 
  }

  return (
    <div className="list-item-container" key={id}>
      <li className="list-item">
        <Link 
          to={{ 
          pathname: '/current-list', 
          state: { currentList: list }
          }}
          className='list-view'
        >
          <h2 className="list-name">{name} ({list.bookCount})</h2>
        </Link>
          <button className="update" onClick={() => props.onEditList(id, name)} />
          <button className={removeClassName} onClick={() => props.onRemoveList(id)} />
        <input
          autoFocus
          placeholder="Enter a new name"
          className={listItemEdit}
          defaultValue={name}
          data-id={id}
          onKeyDown={(event) => handleKeyDown(props, event, id)}
          onBlur={(event) => props.onUpdateList(event, id)}
        />
      </li>
    </div>
  );
}

ReadingList.propTypes = {
  list: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    bookCount: PropTypes.number.isRequired,
    doneCount: PropTypes.number.isRequired,
    books: PropTypes.object
  }),
  editing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  notification: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  notifyClassName: PropTypes.string.isRequired,
  onUpdateList: PropTypes.func.isRequired,
  onEditList: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
};

export default ReadingList;