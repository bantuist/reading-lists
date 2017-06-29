import React from 'react';
import ReactDOM from 'react-dom';
import CurrentListItem from './CurrentListItem';
import renderer from 'react-test-renderer';

it('should render CurrentListItem', () => {
  const tree = renderer.create(<CurrentListItem />).toJSON();
  expect(tree).toMatchSnapshot();
});