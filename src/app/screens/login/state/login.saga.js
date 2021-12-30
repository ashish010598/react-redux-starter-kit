/**
 *
 * Login Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './login.types';
import { api } from '../login.dependencies';
import { saveDatainStore } from './login.actions';

export function* getData({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_DATA_API', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload,
    });
    yield put(saveDatainStore(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
  yield takeEvery(ActionTypes.GET_DATA, getData);
}
