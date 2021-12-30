import { put, call, retry, select } from 'redux-saga/effects';
import _result from 'lodash/result';
import _noop from 'lodash/noop';
import _get from 'lodash/get';
import request from 'app/utils/createRequest';

import config from 'app/config/index.config';
import endpointsActive from 'app/config/autoGenApiEndpoints.json';
import endpointsQA from 'app/config/autoGenApiEndpoints.qa.json';
import { showLoadingSpinner, hideLoadingSpinner } from 'app/state/app.actions';
import { apiErrorHandler } from './apiErrorHandler.saga';

const endpoints = process.env.API_ENV === 'qa' ? endpointsQA : endpointsActive;

const defaultOptions = {
  baseUrl: config.SERVER_URL,
  endpoint: null,
  query: {},
  method: 'GET',
  data: {},
  pathParam: '', // This can be used to give custom path params like /test/12345 where 12345 is dynamic so here -> pathParam: /12345
  path: null, // this is set by api saga based on the endpoint you specify.. this will be overriden if u specify manually
  intercept: true, // by default api saga will intercept all requests for generic errors
  loader: true, // by default show loader for all requests.
  timeout: parseInt(config.API_TIMEOUT, 10),
  retryCount: config.API_MAX_RETRIES,
  /* auth: {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  }, */
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'app-id': config.APP_ID,
  },
};

export function addDefaultApiConfig(apiOptions, state) {
  const pathParam = apiOptions.pathParam || defaultOptions.pathParam;
  const defaultHeaders = { ...defaultOptions.headers };
  if (_get(state, 'userInfo.accessToken', null)) {
    // eslint-disable-next-line dot-notation
    defaultHeaders['Authorization'] = `Bearer ${state.userInfo.accessToken}`;
  }
  // const customerId = state.userInfo.userUuid;

  const headers = { ...defaultHeaders, ...apiOptions.headers };
  // const queryParams = {
  //   ...defaultOptions.query,
  //   ...apiOptions.query,
  //   customerId,
  // };

  return {
    ...defaultOptions,
    ...apiOptions,
    headers,
    // query: queryParams,
    path: _result(endpoints, apiOptions.endpoint, '') + pathParam,
  };
}

export default function* apiSaga(apiOptions, customError, action) {
  const globalState = yield select((state) => state.global);

  const apiConfig = yield call(addDefaultApiConfig, apiOptions, globalState);
  let showLoader = _noop;
  let hideLoader = _noop;
  let response = null;
  if (apiConfig.loader) {
    showLoader = function* generator() {
      yield put(showLoadingSpinner());
    };
    hideLoader = function* generator() {
      yield put(hideLoadingSpinner());
    };
  }

  try {
    yield showLoader();
    // response = yield call(request, apiConfig);
    response = yield retry(apiConfig.retryCount, 0, request, apiConfig);
    yield hideLoader();
  } catch (failedResponse) {
    console.error('API call error:', failedResponse);
    yield hideLoader();
    return yield call(
      apiErrorHandler,
      failedResponse,
      apiConfig,
      customError,
      action,
    );
  }
  return response;
}
