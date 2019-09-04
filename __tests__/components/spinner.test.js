/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../src/components/Spinner';

describe('Loading Spinner', () => {
  test('Renders spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.spinner__container').length).toBe(1);
  });
});
