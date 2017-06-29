import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CurrentList from './CurrentList';
import renderer from 'react-test-renderer';

it('should render CurrentList', () => {
  const tree = renderer.create(<CurrentList />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('#_checkBook', () => {
  let inst;
  beforeEach(() => {
    inst = shallow(<CurrentList />).instance();
  });

  it('should return an updated list if given a unique book', () => {
    // ..
  });

  it('should return undefined if there is a duplicate book', () => {
    // ..
  });
})