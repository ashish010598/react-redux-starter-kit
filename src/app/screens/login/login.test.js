/**
 *
 * Tests for Login
 *
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import pretty from 'pretty';
import configureStore from 'app/store';

import Login from '.';

describe('<Login />', () => {
  let store;
  let persistor;
  let container;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <Login />
          </Provider>
        </PersistGate>,
        container,
      );
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  beforeAll(() => {
    ({ store, persistor } = configureStore(null, {}));
  });

  it('renders correctly and match snapshot', async () => {
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should change default state to name of component on clicking the button', () => {
    act(() =>
      document
        .querySelector('button')
        .dispatchEvent(new MouseEvent('click', { bubbles: true })),
    );
    expect(document.querySelector('.login-container > p').innerHTML).toBe(
      'Default State: Login',
    );
  });

  it('should have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
