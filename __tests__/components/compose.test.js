/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {
  Compose,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/Compose';

const renderCompose = (args) => {
  const defaultProps = {
    authReducer: {},
    messageReducer: {},
    onNewMessage: jest.fn(),
    history: {}
  };
  const props = { ...defaultProps, ...args };

  return mount(<MemoryRouter><Compose {...props} /></MemoryRouter>);
};

describe('Compose Page', () => {
  test('Renders signup page', () => {
    const wrapper = renderCompose({
      authReducer: {
        isAuthenticated: true,
        currentUser: {
          email: 'email'
        }
      }
    });

    wrapper
      .find('#to')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#subject')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#mail-editor')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('form')
      .simulate('submit');

    expect(wrapper.find('.wrapper').length).toBe(1);
    expect(wrapper.find('.mail-nav').length).toBe(1);
    expect(wrapper.find('.mail-nav-items').length).toBe(1);
    expect(wrapper.find('.mails').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(2);
    expect(wrapper.find('form').length).toBe(1);
  });

  test('should map dispatch and state to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onNewMessage({ body: 'message' });
    mapStateToProps({ authReducer: { isAuthenticated: false } });
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });
});
