/**
 * Base settings applicable across environments
 *
 * This file can include shared settings across environments
 *
 */
import { ROUTES } from 'app/app.constants';
export default {
  PRIVATE_ROOT: '/',
  PUBLIC_ROOT: '/',
  AUTHORISED_ROUTES: {
    manager: {
      routes: [ROUTES.LOGIN.url],
      rootRoute: ROUTES.LOGIN.url,
    },
    admin: {
      routes: [ROUTES.LOGIN.url],
      rootRoute: ROUTES.LOGIN.url,
    },
  },
  API_MAX_RETRIES: 0,
  APP_ID: 'React Redux Starter Kit',
  SENTRY_CONFIG: {
    DSN: 'https://sentryDsnForTheApp',
  },
};
