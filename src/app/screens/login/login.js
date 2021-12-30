/**
 *
 * Login container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getDataFromAPI } from './state/login.actions';
import reducer from './state/login.reducer';
import saga from './state/login.saga';
import { injectReducer, injectSaga } from './login.dependencies';

import _get from 'lodash/get';

export const Login = ({ getDataAction, data }) => {
  console.log('login screen');
  return (
    <div className="login-container">
      <h1>Login Screen</h1>
      <p>Default State: {data && _get(data, 'billingDetails.emailId')}</p>
      <button type="button" onClick={() => getDataAction()}>
        Change Default State To Login
      </button>
    </div>
  );
};

Login.propTypes = {
  data: PropTypes.object,
  getDataAction: PropTypes.func,
};

const mapStateToProps = (state) => ({
  data: state.login.data,
});

const mapDispatchToProps = (dispatch) => ({
  getDataAction: (payload) => dispatch(getDataFromAPI(payload)),
});

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(Login);
