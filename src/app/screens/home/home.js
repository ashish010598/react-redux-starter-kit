/**
 *
 * Home container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { defaultAction } from './state/home.actions';
import reducer from './state/home.reducer';
import saga from './state/home.saga';
import { injectReducer, injectSaga } from './home.dependencies';

export const Home = (props) => (
  <div className="home-container">
    <h1>Home Screen</h1>
    <p>Default State: {props.defaultState}</p>
    <button type="button" onClick={() => props.defaultAction('Home')}>
      Change Default State To Home
    </button>
  </div>
);

Home.propTypes = {
  defaultState: PropTypes.any,
  defaultAction: PropTypes.func,
};

const mapStateToProps = (state) => ({
  defaultState: state.home.defaultState,
});

const mapDispatchToProps = (dispatch) => ({
  defaultAction: (payload) => dispatch(defaultAction(payload)),
});

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(Home);
