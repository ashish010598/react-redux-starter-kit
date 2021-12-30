/**
 *
 * Home Dependencies
 *
 */

import api from 'app/utils/api/api.saga';
import IMG from 'app/utils/images';
import injectReducer from 'app/utils/injectReducer';
import injectSaga from 'app/utils/injectSaga';
// import AppConstants from 'app/app.constants.json';

import { ROUTES } from 'app/app.constants';

export {
  injectReducer,
  injectSaga,
  IMG,
  api,
  ROUTES,
  // AppConstants,
};
