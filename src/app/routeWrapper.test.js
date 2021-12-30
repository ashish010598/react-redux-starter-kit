import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { AppConstants } from 'app/app.constants';

import configureStore from 'dist/store';
import { Routes } from './routesWrapper';

describe('<Routes />', () => {
  let component;
  const { store } = configureStore(null, {});

  beforeEach(() => {
    component = shallow(<Routes />);
  });

  it('Routes component renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Routes />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render routes with PageHeader and SideDrawer if accessToken is set', () => {
    component.setProps({ accessToken: 'abcd' });
    component.update();
    const layoutContainer = component.find('.layout-container');
    expect(layoutContainer.length).toBe(0);
  });
});
