import { compose } from 'redux';
import withAuthCheck from 'app/hoc/AuthRouteCheck';

export const getHOCWrappedComponent = (component, routeObj) =>
  compose(withAuthCheck(routeObj.isPrivate))(component);

// export const getHOCWrappedComponent = (component) => component;
