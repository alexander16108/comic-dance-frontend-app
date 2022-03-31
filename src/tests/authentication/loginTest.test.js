import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Logout from '../../pages/Logout';
import store from '../../redux/configureStore';

it('Login renders the UI as expected', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Logout />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
