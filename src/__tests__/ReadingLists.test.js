import React from 'react';
import ReactDOM from 'react-dom';
import ReadingLists from '../components/ReadingLists/ReadingLists';
import { add, remove } from '../components/edit-lists';
import renderer from 'react-test-renderer';

test('ReadingLists should render ReadingLists', () => {
  const tree = renderer.create(<ReadingLists />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('addList adds a new list', () => {
  // const exampleList = ReadingLists.addList('Example List');
  // expect()
  // expect(exampleList).toEqual({
  //   name: expect.any(String),
  //   id: expect.any(String),
  //   createdAt: expect.any(Number),
  //   bookCount: expect.any(Number),
  //   doneCount: expect.any(Number),
  // });
// });

// test('removeList removes a list', () => {
//   const { lists } = this.state;
//   const exampleList = ReadingLists.addList('Example List');
//   expect(ReadingLists.removeList(exampleList.id)).toEqual({

//   });
// });

