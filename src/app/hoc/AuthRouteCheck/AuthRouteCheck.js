import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

import config from 'app/config/index.config';
import { AppConstants, USER_CONFIG_COMMON_ROUTES } from 'app/app.constants';

export const withAuthCheck = (isPrivate = false) => (WrappedComponent) => {
  const HOC = (props) => {
    const menu = _get(props, 'userConfig.menu', []);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      const getRedirectionURL = (queryStr) => {
        const paramsArr = queryStr.substring(1).split('&');
        let redirectUrl = null;
        paramsArr.forEach((param) => {
          const pair = param.split('=');
          if (pair[0].toLowerCase() === 'redirect') {
            redirectUrl = decodeURIComponent(pair[1]);
          }
        });
        return redirectUrl;
      };

      const redirectUrl = getRedirectionURL(props.location.search);
      if (!_isEmpty(redirectUrl)) {
        localStorage.setItem('redirect_url', redirectUrl);
      }

      if (
        (!props.accessToken ||
          props.accessToken === AppConstants.INVALID ||
          props.accessToken === AppConstants.E403) &&
        isPrivate
      ) {
        // If Access Token doesn't exist or isn't valid and the route being accessed is a private route, redirect to public one
        props.history.push(config.PUBLIC_ROOT);
      } else if (
        props.accessToken &&
        props.accessToken !== AppConstants.INVALID &&
        props.accessToken !== AppConstants.E403 &&
        !isPrivate
      ) {
        // If Access Token exists & is valid and the route being accessed is a public route (auth module), redirect to private one (home)
        const redirectUrlFromLS = localStorage.getItem('redirect_url');

        if (
          !_isEmpty(redirectUrlFromLS) &&
          _find([...menu, ...USER_CONFIG_COMMON_ROUTES], {
            url: props.location.pathname,
          })
        ) {
          props.history.push(redirectUrlFromLS);
          localStorage.setItem('redirect_url', '');
        } else {
          props.history.push(
            menu.length > 0 ? menu[0].url : config.PUBLIC_ROOT,
          );
        }
      } else if (
        props.accessToken &&
        props.accessToken !== AppConstants.INVALID &&
        props.accessToken !== AppConstants.E403 &&
        isPrivate &&
        !_find([...menu, ...USER_CONFIG_COMMON_ROUTES], {
          url: props.location.pathname,
        })
      ) {
        // If Access Token exists & is valid and the route being accessed is a private route (auth module), but route is not accessible to current user, redirect
        props.history.push(menu.length > 0 ? menu[0].url : config.PUBLIC_ROOT);
      } else {
        setShouldRender(true);
      }
    }, []);

    return shouldRender && <WrappedComponent {...props} />;
  };

  HOC.propTypes = {
    accessToken: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    userUuid: PropTypes.string,
    userConfig: PropTypes.object,
  };

  const mapStateToProps = (state) => ({
    accessToken: state.global.userInfo.accessToken,
    userUuid: state.global.userInfo.userUuid,
    userConfig: state.global.userInfo.userConfig,
  });

  const withConnect = connect(mapStateToProps, null);

  return withConnect(HOC);
};
