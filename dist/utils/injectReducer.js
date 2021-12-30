function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './reducerInjectors';
/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

export default (({
  key,
  reducer,
  shouldPersist = true,
  blacklist = null,
  whitelist = null
}) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    constructor(props, context) {
      super(props, context);
      const {
        store
      } = context;
      getInjectors(store).injectReducer(key, reducer, shouldPersist, blacklist, whitelist);
    }

    render() {
      return /*#__PURE__*/React.createElement(WrappedComponent, this.props);
    }

  }

  _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

  _defineProperty(ReducerInjector, "contextType", ReactReduxContext);

  _defineProperty(ReducerInjector, "displayName", `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`);

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
});