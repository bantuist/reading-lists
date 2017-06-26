import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ReadingList from '../components/ReadingList/ReadingList';
import renderer from 'react-test-renderer';

function log(msg) {
  require('fs').appendFileSync('./jest.log.js', msg + '\n', {'encoding': 'utf8'});
}

it('should render ReadingList', () => {
  log(Link);
  const tree = renderer.create(<ReadingList />).toJSON();
  expect(tree).toMatchSnapshot();
});

