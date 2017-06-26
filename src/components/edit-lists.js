import base from '../rebase';
import uuidv1 from 'uuid/v1';

export function add(name) {
  const id = uuidv1();
  const createdAt = Date.now();
  const newList = { name, id, createdAt, bookCount: 0, doneCount: 0 };

  base.post(`/${id}`, {
    data: newList,
    context: this,
    then: () => {
      console.log(`Posted new list`);
    }
  });
}

export function remove(id) {
  base.remove(id).then(() => {
    console.log(`Removed list`);
  }).catch(error => {
    console.log('error', error);
  });
}

export function update(name, id) {
  base.update(`${id}`, {
    data: { name: name },
    then(err) {
      if (!err) {
        console.log(`Updated list`);
      }
    }
  });
}