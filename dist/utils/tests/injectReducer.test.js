/**
 * Test injectors
 */
import { memoryHistory } from 'react-router-dom';
import { shallow } from 'enzyme';
import React from 'react';
import { identity } from 'lodash';
import configureStore from '../../store';
import injectReducer from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors'; // Fixtures

const Component = () => null;

const reducer = identity;
describe('injectReducer decorator', () => {
  let store;
  let injectors;
  let ComponentWithReducer;
  beforeAll(() => {
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
  });
  beforeEach(() => {
    store = configureStore(null, {}, memoryHistory);
    injectors = {
      injectReducer: jest.fn()
    };
    ComponentWithReducer = injectReducer({
      key: 'test',
      reducer
    })(Component);
    reducerInjectors.default.mockClear();
  });
  it('should inject a given reducer', () => {
    shallow( /*#__PURE__*/React.createElement(ComponentWithReducer, null), {
      context: {
        store
      }
    });
    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer, true, null, null);
  });
  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(injectReducer({
      key: 'test',
      reducer
    })(() => null).displayName).toBe('withReducer(Component)');
  });
  it('should propagate props', () => {
    const props = {
      testProp: 'test'
    };
    const renderedComponent = shallow( /*#__PURE__*/React.createElement(ComponentWithReducer, props), {
      context: {
        store
      }
    });
    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});