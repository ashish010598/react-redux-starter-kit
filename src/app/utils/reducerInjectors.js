import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import createReducer from './createReducer';
import checkStore from './checkStore';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(
    key,
    reducer,
    shouldPersist,
    blacklist,
    whitelist,
    storageEngine = storage,
  ) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    const persistConfig = {
      key,
      storage: storageEngine,
      blacklist,
      whitelist,
      stateReconciler: autoMergeLevel2,
    };

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      ((shouldPersist &&
        store.injectedReducers[key] ===
          persistReducer(persistConfig, reducer)) ||
        (!shouldPersist && store.injectedReducers[key] === reducer))
    )
      return;

    /* eslint-disable no-param-reassign */
    if (shouldPersist) {
      store.injectedReducers[key] = persistReducer(persistConfig, reducer);
    } else {
      store.injectedReducers[key] = reducer;
    }
    store.replaceReducer(
      createReducer(store.preLoadedReducers, store.injectedReducers),
    );
    store.persistor.persist();
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
