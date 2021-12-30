import React from 'react';
import { shallow } from 'enzyme';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import MainLoader from './Loader';
import EventManager from '../../utils/event-manager.service';
// configure({ adapter: new Adapter() });

// To Test memo components
jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: (x) => x };
});

describe('<MainLoader/>', () => {
  it('should render left side', () => {
    const wrapper = shallow(<MainLoader />);
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find('div.loading-bar')).toHaveLength(1);
  });

  it('should add [hide] class', () => {
    const wrapper = shallow(<MainLoader />);
    EventManager.publish('loader', false);
    expect(wrapper.find('.loading')).toHaveLength(1);
  });

  it('should add [show] class', () => {
    const wrapper = shallow(<MainLoader />);
    EventManager.publish('loader', true);
    expect(wrapper.find('.loading')).toHaveLength(1);
  });
});
