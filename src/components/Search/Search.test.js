import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import renderer from 'react-test-renderer';
// import localStorageMock from '../../localStorageMock';

// const localStorage = new localStorageMock();

it('should render Search', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});
