import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ReadingList from './ReadingList';
import renderer from 'react-test-renderer';

it('should render ReadingList', () => {
  const tree = renderer.create(<ReadingList />).toJSON();
  expect(tree).toMatchSnapshot();
});
