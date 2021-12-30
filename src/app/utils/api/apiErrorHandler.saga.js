import { call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { throwException } from 'app/utils/common';
import { AppConstants } from 'app/app.constants';
import config from 'app/config/index.config';
// import { logoutUser, setAccountDeactivatePopup } from 'app/state/app.actions';
import api from './api.saga';

export function* apiErrorHandler(response, apiConfig, customError = false) {
  const { status } = response;
  if (status === 401) {
    // fire the required action here
    toastr.error('Session Expired', 'Please login again.');
    return yield call(throwException, response);
  }
  if (status === 405) {
    // fire the required action over 405
  }

  if (!apiConfig.intercept) {
    return yield call(throwException, response);
  }

  if (!customError) {
    switch (true) {
      case status >= 400 && status < 500:
        toastr.error(
          AppConstants.GLOBAL_ERRORS.TITLE.DATA_ERROR,
          AppConstants.GLOBAL_ERRORS.MESSAGE.DATA_ERROR,
        );
        break;
      case status >= 500 && status < 600:
        toastr.error(
          AppConstants.GLOBAL_ERRORS.TITLE.SERVER_ERROR,
          AppConstants.GLOBAL_ERRORS.MESSAGE.SERVER_ERROR,
        );
        break;
      default:
        toastr.error(
          AppConstants.GLOBAL_ERRORS.TITLE.ERROR,
          AppConstants.GLOBAL_ERRORS.MESSAGE.ERROR,
        );
    }
  }
  return yield call(throwException, response);
}

export function* retryApi(apiConfig, errorResponse) {
  const { retryCount } = apiConfig;
  const apiConfigToHit = { ...apiConfig, retryCount: retryCount + 1 };
  if (apiConfig.retryCount >= config.API_MAX_RETRIES) {
    return yield call(throwException, errorResponse); // return error instead, if you want the caller to get the response;
  }
  return yield call(api, apiConfigToHit);
}
