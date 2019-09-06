/* profileActions.test.js eslint-disable no-undef */
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import {
  POST_NEW_MESSAGE_START,
  POST_NEW_MESSAGE_FAIL,
  POST_NEW_MESSAGE_SUCCESS
} from '../../../src/store/types/messages.type';
import {
  sendMessage
} from '../../../src/store/actions/messages.actions';
import mockData from '../../../__mocks__/data';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZmlyc3RuYW1lIjoiRGVzY2hhbnQgIiwibGFzdG5hbWUiOiJLb3Vub3UiLCJlbWFpbCI6ImtvdW5vdWRlc2NoYW50QGVwaWMubWFpbCIsImlhdCI6MTU2NzYxNzkwMiwiZXhwIjoxNTY3NzA0MzAyfQ.f6GGyxdVzPZftqT6jNXqbFsUmvutr6fZXNQ5JpG3KIk';
// eslint-disable-next-line no-undef
const { API_URL } = process.env;

describe('Message Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('should have POST_NEW_MESSAGE_START and POST_NEW_MESSAGE_SUCCESS', async (done) => {
    moxios.stubRequest(`${API_URL}/messages`, {
      status: 201,
      response: { data: [{ ...mockData.messageResponse }] }
    });

    const expectedActions = [
      { type: POST_NEW_MESSAGE_START },
      { type: POST_NEW_MESSAGE_SUCCESS, payload: { message: mockData.messageResponse } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(sendMessage(mockData.newMessage));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  test('should have POST_NEW_MESSAGE_START and POST_NEW_MESSAGE_FAIL', async (done) => {
    moxios.stubRequest(`${API_URL}/messages`, {
      status: 400,
      response: { error: new Error('Request failed with status code 400') }
    });

    const expectedActions = [
      { type: POST_NEW_MESSAGE_START },
      { type: POST_NEW_MESSAGE_FAIL, payload: { error: new Error('Request failed with status code 400') } }
    ];
    const store = mockStore({});

    moxios.wait(async () => {
      await store.dispatch(sendMessage(mockData.newMessage));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
