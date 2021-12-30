import React, { Suspense, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Switch,
  HashRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import _forEach from 'lodash/forEach';

import Loader from 'app/components/Loader';
import ErrorBoundary from 'app/components/ErrorHandler';

import { getHOCWrappedComponent } from './utils/component';
import config from './config/index.config';
import { routeMap } from './app.routes';
import { META_TAGS } from './app.constants';
import { setMetaTags } from './utils/common';

const getRouteComponents = (routes) => {
  const routeComponents = [];
  _forEach(routes, (route) => {
    routeComponents.push(
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={getHOCWrappedComponent(route.screen, route)}
      />,
    );
  });
  return routeComponents;
};

export const Routes = (props) => {
  const { accessToken } = props;

  useEffect(() => {
    setMetaTags(META_TAGS.DEFAULT);
  }, [accessToken]);

  const noRolesAuthRouteMap = (
    <Suspense fallback={<Loader />}>
      <Switch>
        {getRouteComponents(routeMap)}
        <Redirect to={config.PUBLIC_ROOT} /> {/* Redirect if 404 */}
      </Switch>
    </Suspense>
  );

  return (
    <Router>
      <ErrorBoundary>
        <div className="relative">{noRolesAuthRouteMap}</div>
      </ErrorBoundary>
    </Router>
  );
};

Routes.propTypes = {
  accessToken: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accessToken: state.global.userInfo.accessToken,
});

export default connect(mapStateToProps, null)(memo(Routes));
