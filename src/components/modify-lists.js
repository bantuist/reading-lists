import base from '../rebase';
import uuidv1 from 'uuid/v1';

export function addList(name, lists) {
  const id = uuidv1();
  const createdAt = Date.now();

  base.post(`/${id}`, {
    data: { name, id, createdAt, bookCount: 0, doneCount: 0 },
    context: this,
    then: () => {
      console.log(`Posted new list`);
    }
  });
}

export function removeList(id) {
  base.remove(id).then(() => {
    console.log(`Removed ${id}`);
  }).catch(error => {
    console.log('error', error);
  });
}

export function updateList(name, id) {
  base.update(`${id}`, {
    data: { name: name },
    then(err) {
      if (!err) {
        console.log(`Updated list`);
      }
    }
  });
}