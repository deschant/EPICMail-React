/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {
  Login,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/Login';

const renderLogin = (args) => {
  const defaultProps = {
    onLogin: jest.fn(),
    history: {
      push: jest.fn()
    },
    authReducer: {}
  };
  const props = { ...defaultProps, ...args };

  return mount(<MemoryRouter><Login {...props} /></MemoryRouter>);
};

describe('Login Page', () => {
  test('Renders signup page', () => {
    const wrapper = renderLogin({
      authReducer: {
        isAuthenticated: true,
        currentUser: {
          email: 'email'
        }
      },
      location: {
        search: '?/auth=false'
      }
    });

    wrapper
      .find('#login-email')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#login-password')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('form')
      .simulate('submit');

    expect(wrapper.find('.wrapper').length).toBe(1);
    expect(wrapper.find('.left').length).toBe(1);
    expect(wrapper.find('.right').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
  });

  test('should map dispatch and state to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogin();
    mapStateToProps({ authReducer: { isAuthenticated: false } });
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });
});
