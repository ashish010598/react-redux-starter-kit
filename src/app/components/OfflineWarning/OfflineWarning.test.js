/**
 *
 * Tests for OfflineWarning
 *
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import OfflineWarning from '.';

describe('<OfflineWarning />', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      render(<OfflineWarning />, container);
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders correctly and match snapshot', async () => {
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    expect(spy).not.toHaveBeenCalled();
  });

  it('checking navigator status to false', () => {
    expect(global.navigator.onLine).toBe(false);
  });

  it('checking the visibility of no connectivity div when application is offline', () => {
    act(() => {
      const goOffline = new window.Event('offline');
      window.dispatchEvent(goOffline);
    });
    expect(
      container.firstChild.classList.contains('offline-warning-wrap'),
    ).toBe(true);
  });
});
