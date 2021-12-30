import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import pretty from 'pretty';
import configureStore from 'dist/store';

import App from './app';
import { reducer } from './state/app.reducer';
import { ActionTypes } from './state/app.types';

global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

const initialState = {
  isLoading: false,
  // isSideDrawerOpen: false,
  userInfo: {
    userId: null,
    accessToken: null,
    refreshToken: null,
    sessionToken: null,
    deviceToken: null,
    userName: null,
    userRoles: null,
  },
};

describe('<App />', () => {
  let store;
  let persistor;
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  beforeAll(() => {
    ({ store, persistor } = configureStore(reducer, {}));
  });

  it('renders correctly', async () => {
    act(() => {
      render(
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>,
        container,
      );
    });
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});

describe('App reducer', () => {
  it('should handle SHOW_LOADER', () => {
    const action = {
      type: ActionTypes.SHOW_LOADER,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle HIDE_LOADER', () => {
    const action = {
      type: ActionTypes.HIDE_LOADER,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('should handle SET_DEVICE_TOKEN', () => {
    const action = {
      type: ActionTypes.SET_DEVICE_TOKEN,
      payload: 'xyZ12',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      userInfo: {
        ...initialState.userInfo,
        deviceToken: 'xyZ12',
      },
    });
  });

  /* it('should handle TOGGLE_SIDE_DRAWER', () => {
    const action = {
      type: ActionTypes.TOGGLE_SIDE_DRAWER,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isSideDrawerOpen: true,
    });
  }); */

  it('should handle SET_AUTH_STATE', () => {
    const action = {
      type: ActionTypes.SET_AUTH_STATE,
      payload: {},
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      userInfo: {},
    });
  });

  it('should handle RESET_AUTH_STATE', () => {
    const action = {
      type: ActionTypes.RESET_AUTH_STATE,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      userInfo: {
        userId: null,
        accessToken: null,
        refreshToken: null,
        sessionToken: null,
        deviceToken: null,
        userName: null,
        userRoles: null,
        siteId: null,
        sitesList: [],
        userIdKey: null,
      },
    });
  });
});
