/**
 * app.js
 *
 * This is the global Container/feature.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import injectSaga from 'app/utils/injectSaga';
import Loader from 'app/components/Loader';
import ServiceErrorModal from 'app/components/ServiceErrorModal';
import OfflineWarning from 'app/components/OfflineWarning';
import { AppConstants } from 'app/app.constants';
import appSaga from './state/app.saga';
import Routes from './routesWrapper';

export const App = (props) => (
  <>
    <OfflineWarning />
    <Routes />
    <ServiceErrorModal />
    {props.isLoading && <Loader />}
    <ReduxToastr
      timeOut={AppConstants.TOASTR_TIMEOUT_IN_SECS * 1000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </>
);

App.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state.global.isLoading,
});

const withConnect = connect(mapStateToProps, null);

const withAppSaga = injectSaga({ key: 'global', saga: appSaga });

export default compose(withAppSaga, withConnect)(App);
