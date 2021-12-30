/**
 *
 * Login Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { ROUTES } from './login.dependencies';

const Login = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: ROUTES.LOGIN.url,
    screen: Login,
    isPrivate: false,
    sidebar: false,
    name: 'Login',
  },
];
