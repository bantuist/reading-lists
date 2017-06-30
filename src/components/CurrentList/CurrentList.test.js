import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { buildList } from '../../utility';
import CurrentList from './CurrentList';
import renderer from 'react-test-renderer';

const newBook = {
    "amount" : 16.99,
    "authors" : [ "Yuval Noah Harari" ],
    "id" : "FmyBAwAAQBAJ",
    "imageLinks" : "http://books.google.com/books/content?id=FmyBAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "isRead" : false,
    "title" : "Sapiens"
};
const newBookID = newBook.id;

it('should render CurrentList', () => {
  const tree = renderer.create(<CurrentList />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('#_checkBook', () => {
  let inst;
  beforeEach(() => {
    inst = shallow(<CurrentList />).instance();
  });

  it('should return a list with 1 book if no books', () => {
    inst.state.currentList['1'] = buildList('Test List');
    expect(inst.state.currentList.books).toBeUndefined();
    inst._checkBook(newBook);
  });

  it('should return undefined if there is a duplicate book', () => {
    inst.state.currentList['1'] = buildList('Test List');
    inst._checkBook(newBook);
    expect(inst.state.currentList.books[newBookID]).toEqual(newBook);
    expect(inst._checkBook(newBook)).toBeUndefined();    
  });
})