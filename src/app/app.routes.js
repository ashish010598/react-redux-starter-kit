/** All routes of the app are imported here, routes are defined in their respective folders */

/** Primary Routes */
import LoginScreenRoutes from 'app/screens/login/login.routes';
import HomeScreenRoute from 'app/screens/home/home.routes';

export const routeMap = [...HomeScreenRoute, ...LoginScreenRoutes];
