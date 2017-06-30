import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function handleKeyDown(onUpdateList, event, id) {
  // TODO: Add escape edit 
  const enter = 13;
  if (event.which === enter && event.target.value !== '') {
    onUpdateList(event, id);
  }
}
function ReadingList({ list, notifications, onEditList, onRemoveList, onUpdateList }) {
  let id = 'none';
  let name = 'none';
  let bookCount = 0;

  if (list) {
    id = list.id;
    name = list.name;
    bookCount = list.bookCount;
  }
  let listItemEdit = 'list-item-edit';
  let removeClassName = 'remove';

  // Toggle list editing and notifications
  if (notifications && notifications.editing === id) {
    listItemEdit += ' editing';
    removeClassName += ' show';
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
          <h2 className="list-name">{name} ({bookCount})</h2>
        </Link>
          <button className="update" onClick={() => onEditList(id, name)} />
          <button className={removeClassName} onClick={() => onRemoveList(id)} />
        <input
          autoFocus
          placeholder="Enter a new name"
          className={listItemEdit}
          defaultValue={name}
          data-id={id}
          onKeyDown={(event) => handleKeyDown(onUpdateList, event, id)}
          onBlur={(event) => onUpdateList(event, id)}
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
    books: PropTypes.object,
  }),
  editing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  notification: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // Require?
  onUpdateList: PropTypes.func,
  onEditList: PropTypes.func,
  onRemoveList: PropTypes.func,
};

export default ReadingList;