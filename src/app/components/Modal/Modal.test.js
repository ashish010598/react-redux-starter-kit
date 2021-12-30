import React from 'react';
import { shallow } from 'enzyme';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal';

// configure({ adapter: new Adapter() });

/*
 * Doc URL: https://airbnb.io/enzyme/
 * */
describe('<Modal/>', () => {
  it('should check custom type modal show case', () => {
    const wrapper = shallow(
      <Modal type="CUSTOM" show>
        <ul>
          <li>test1</li>
          <li>test2</li>
        </ul>
      </Modal>,
    );
    expect(wrapper.find('li')).toHaveLength(2);
  });
  it('should check custom type modal hidden case', () => {
    const wrapper = shallow(
      <Modal type="CUSTOM" show={false}>
        <ul>
          <li>test1</li>
          <li>test2</li>
        </ul>
      </Modal>,
    );
    expect(wrapper.find('li')).toHaveLength(0);
  });
  it('should check native type modal show case', () => {
    const data = {
      title: 'test title',
      body: 'test body',
      footer: 'test footer',
    };
    const wrapper = shallow(<Modal show data={data} />);
    expect(wrapper.contains(<h4>test title</h4>)).toEqual(true);
    expect(
      wrapper.contains(<div className="modal-body">test body</div>),
    ).toEqual(true);
    expect(
      wrapper.contains(
        <div className="modal-footer" align="right">
          test footer
        </div>,
      ),
    ).toEqual(true);
  });
  it('should check native type modal hidden case', () => {
    const data = {
      title: 'test title',
      body: 'test body',
      footer: 'test footer',
    };
    const wrapper = shallow(<Modal show={false} data={data} />);
    expect(wrapper.exists('test title')).toEqual(false);
    expect(wrapper.exists('test body')).toEqual(false);
    expect(wrapper.exists('test footer')).toEqual(false);
  });
});
