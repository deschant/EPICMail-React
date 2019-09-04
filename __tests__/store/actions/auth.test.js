/* profileActions.test.js eslint-disable no-undef */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../../../src/store/types/auth.type';
import {
  login,
  signup
} from '../../../src/store/actions/auth.actions';
import mockData from '../../../__mocks__/data';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZmlyc3RuYW1lIjoiRGVzY2hhbnQgIiwibGFzdG5hbWUiOiJLb3Vub3UiLCJlbWFpbCI6ImtvdW5vdWRlc2NoYW50QGVwaWMubWFpbCIsImlhdCI6MTU2NzYxNzkwMiwiZXhwIjoxNTY3NzA0MzAyfQ.f6GGyxdVzPZftqT6jNXqbFsUmvutr6fZXNQ5JpG3KIk';
// eslint-disable-next-line no-undef
const { API_URL } = process.env;

describe('Auth Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('should have SIGN_UP_START and SIGN_UP_SUCCESS', async (done) => {
    moxios.stubRequest(`${API_URL}/auth/signup`, {
      status: 201,
      response: { data: [{ token: testToken }] }
    });

    const expectedActions = [
      { type: SIGN_UP_START },
      { type: SIGN_UP_SUCCESS, payload: { token: testToken } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(signup(mockData.newUser));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  test('should have SIGN_UP_START and SIGN_UP_FAIL', async (done) => {
    moxios.stubRequest(`${API_URL}/auth/signup`, {
      status: 400,
      response: { error: new Error('Request failed with status code 400') }
    });

    const expectedActions = [
      { type: SIGN_UP_START },
      { type: SIGN_UP_FAIL, payload: { error: new Error('Request failed with status code 400') } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(signup({ ...mockData.newUser, email: 'invalid@email' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  test('should have LOGIN_START and LOGIN_SUCCESS', async (done) => {
    moxios.stubRequest(`${API_URL}/auth/signin`, {
      status: 200,
      response: { data: [{ token: testToken }] }
    });

    const expectedActions = [
      { type: LOGIN_START },
      { type: LOGIN_SUCCESS, payload: { token: testToken } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(login({ email: 'test@email.com', password: 'qwet3242442' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  test('should have LOGIN_START and LOGIN_FAIL', async (done) => {
    moxios.stubRequest(`${API_URL}/auth/signin`, {
      status: 400,
      response: { error: new Error('Request failed with status code 400') }
    });

    const expectedActions = [
      { type: LOGIN_START },
      { type: LOGIN_FAIL, payload: { error: new Error('Request failed with status code 400') } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(login({ email: 'test@emailcom', password: 'qwet3242442' }));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
