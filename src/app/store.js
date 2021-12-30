/**
 * Create the store with dynamic reducers
 */

import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createReducer from './utils/createReducer';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(globalReducer, initialState = {}) {
  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;
  /* eslint-enable */

  const preLoadedReducers = {
    global: globalReducer,
    toastr: toastrReducer,
  };

  const store = createStore(
    createReducer(preLoadedReducers),
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.persistor = persistor;
  store.preLoadedReducers = preLoadedReducers;

  // sagaMiddleware.run(sagas);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./utils/createReducer', () => {
      store.replaceReducer(
        createReducer(preLoadedReducers, store.injectedReducers),
      );
    });
  }

  return { persistor, store };
}
