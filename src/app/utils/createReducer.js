/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import { persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(
  preloadedReducers,
  injectedReducers = {},
) {
  /* const persistConfig = {
    key: 'app',
    storage,
  }; */

  const rootReducer = {
    ...preloadedReducers,
    ...injectedReducers,
  };

  return combineReducers(rootReducer);
  // return persistCombineReducers(persistConfig, rootReducer);
}
