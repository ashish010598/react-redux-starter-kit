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
export default ({
  key,
  reducer,
  shouldPersist = true,
  blacklist = null,
  whitelist = null,
}) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withReducer(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    constructor(props, context) {
      super(props, context);
      const { store } = context;
      getInjectors(store).injectReducer(
        key,
        reducer,
        shouldPersist,
        blacklist,
        whitelist,
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
