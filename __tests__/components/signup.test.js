/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {
  Signup,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/Signup';

const renderSignup = (args) => {
  const defaultProps = {
    onSignup: jest.fn(),
    history: {
      push: jest.fn()
    },
    authReducer: {}
  };
  const props = { ...defaultProps, ...args };

  return mount(<MemoryRouter><Signup {...props} /></MemoryRouter>);
};

describe('Signup Page', () => {
  test('Renders signup page', () => {
    const wrapper = renderSignup({
      authReducer: {
        isAuthenticated: true,
        currentUser: {
          email: 'email'
        }
      },
      location: {
        search: '?auth=false'
      }
    });
    wrapper
      .find('#fN')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#lN')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#email-input')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#password')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find('#confirm-password')
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
    mapDispatchToProps(dispatch).onSignup();
    mapStateToProps({ authReducer: { isAuthenticated: false } });
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });
});
