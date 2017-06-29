import React from 'react';
import ReactDOM from 'react-dom';
import Suggestion from './Suggestion';
import renderer from 'react-test-renderer';

it('should render Suggestion', () => {
  const tree = renderer.create(<Suggestion />).toJSON();
  expect(tree).toMatchSnapshot();
});
