import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ReadingLists from './ReadingLists';
import { filterList, buildList } from '../../utility';

test('ReadingLists should render ReadingLists', () => {
  const tree = renderer.create(<ReadingLists />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('#_checkList', () => {
  let inst;
  beforeEach(() => {
    inst = shallow(<ReadingLists />).instance();
  });

  it('should return a new list if given a unique name', () => {
    expect(inst._checkList('New List')).toBeInstanceOf(Object);
    expect(inst._checkList('New List')).toHaveProperty('id');
    expect(inst._checkList('New List')).toHaveProperty('name', 'New List');
  });

  it('should return undefined if name is blank', () => {
    expect(inst._checkList('')).toBeUndefined();
  });
  
  it('should return undefined if there is a duplicate list', () => {
    inst.state.lists['1'] = buildList('First List');
    expect(inst._checkList('First List')).toBeUndefined();
  });
})


