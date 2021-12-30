/**
 *
 * Home Routes
 * Import the route file in app.routes to be processed by RoutesWrapper
 *
 */

import { lazy } from 'react';
import { ROUTES } from '../../app.constants';

const Home = lazy(() => import('.'));
// Import child screen routes here

export default [
  {
    exact: true,
    path: ROUTES.HOME.url,
    screen: Home,
    isPrivate: false,
    sidebar: false,
    name: 'Home',
  },
];
