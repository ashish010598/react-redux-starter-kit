function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './sagaInjectors';
/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */

export default (({
  key,
  saga,
  mode
}) => WrappedComponent => {
  class InjectSaga extends React.Component {
    constructor(props, context) {
      super(props, context);
      const {
        store
      } = context;
      this.injectors = getInjectors(store);
      this.injectors.injectSaga(key, {
        saga,
        mode
      }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return /*#__PURE__*/React.createElement(WrappedComponent, this.props);
    }

  }

  _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

  _defineProperty(InjectSaga, "contextType", ReactReduxContext);

  _defineProperty(InjectSaga, "displayName", `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`);

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
});