/**
 *
 * Tests for Home
 *
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import pretty from 'pretty';
import configureStore from 'app/store';

import Home from '.';

describe('<Home />', () => {
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
            <Home />
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
    expect(document.querySelector('.home-container > p').innerHTML).toBe(
      'Default State: Home',
    );
  });

  it('should have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
});
