/**
 *
 * App Sagas
 *
 */

// import { call, put, takeEvery } from 'redux-saga/effects';
// import { ActionTypes } from './app.types';
// import { api } from '../dummyFirstScreen.dependencies';
// import { dataLoadedSuccess } from './app.actions';

/* export function* getDataFromAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'API_NAME', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload,
    });

    yield put(dataLoadedSuccess(result.body.data));
  } catch (error) {
    console.error('Error during API call!', error);
  }
} */

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  // yield takeEvery(ActionTypes.GET_DATA_FROM_API, getDataFromAPI);
}
