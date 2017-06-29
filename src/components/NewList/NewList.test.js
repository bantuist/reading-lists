import React from 'react';
import ReactDOM from 'react-dom';
import NewList from './NewList';
import renderer from 'react-test-renderer';

it('should render NewList', () => {
  const tree = renderer.create(<NewList />).toJSON();
  expect(tree).toMatchSnapshot();
});