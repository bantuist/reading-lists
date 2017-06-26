import React from 'react';
import ReactDOM from 'react-dom';
import CurrentList from '../components/CurrentList/CurrentList';
import renderer from 'react-test-renderer';

it('should render CurrentList', () => {
  const tree = renderer.create(<CurrentList />).toJSON();
  expect(tree).toMatchSnapshot();
});