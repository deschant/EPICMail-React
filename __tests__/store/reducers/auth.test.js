import reducer from '../../../src/store/reducers/auth.reducer';
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../../../src/store/types/auth.type';

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZmlyc3RuYW1lIjoiRGVzY2hhbnQgIiwibGFzdG5hbWUiOiJLb3Vub3UiLCJlbWFpbCI6ImtvdW5vdWRlc2NoYW50QGVwaWMubWFpbCIsImlhdCI6MTU2NzYxNzkwMiwiZXhwIjoxNTY3NzA0MzAyfQ.f6GGyxdVzPZftqT6jNXqbFsUmvutr6fZXNQ5JpG3KIk';

describe('Auth Reducers', () => {
  describe('Signup reducers', () => {
    test('SIGN_UP_START', () => {
      const initialState = {
        signupStart: false
      };

      expect(reducer(initialState, { type: SIGN_UP_START })).toEqual({ signupStart: true });
    });

    test('SIGN_UP_SUCCESS', () => {
      const initialState = {
        currentUser: null,
        error: null,
        signupStart: false,
        signupDone: false,
        isAuthenticated: false
      };

      expect(reducer(initialState, {
        type: SIGN_UP_SUCCESS,
        payload: { token: testToken }
      })).toEqual({
        signupStart: false,
        signupDone: true,
        isAuthenticated: true,
        currentUser: {
          id: 6,
          firstname: "Deschant ",
          lastname: "Kounou",
          email: "kounoudeschant@epic.mail",
          iat: 1567617902,
          exp: 1567704302
        },
        error: null
      });
    });

    test('SIGN_UP_FAIL', () => {
      const initialState = {
        error: null,
        signupStart: false,
        signupDone: false,
        isAuthenticated: false
      };

      expect(reducer(initialState, {
        type: SIGN_UP_FAIL,
        payload: { error: new Error() }
      })).toEqual({
        signupStart: false,
        signupDone: true,
        isAuthenticated: false,
        error: new Error()
      });
    });
  });
  describe('Signup reducers', () => {
    test('LOGIN_START', () => {
      const initialState = {
        loginStart: false
      };

      expect(reducer(initialState, { type: LOGIN_START })).toEqual({ loginStart: true });
    });

    test('LOGIN_SUCCESS', () => {
      const initialState = {
        currentUser: null,
        error: null,
        loginStart: false,
        isAuthenticated: false
      };

      expect(reducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: { token: testToken }
      })).toEqual({
        loginStart: false,
        loginDone: true,
        isAuthenticated: true,
        error: null,
        currentUser: {
          id: 6,
          firstname: "Deschant ",
          lastname: "Kounou",
          email: "kounoudeschant@epic.mail",
          iat: 1567617902,
          exp: 1567704302
        },
      });
    });

    test('LOGIN_FAIL', () => {
      const initialState = {
        error: null,
        loginStart: false,
        isAuthenticated: false
      };

      expect(reducer(initialState, {
        type: LOGIN_FAIL,
        payload: { error: new Error() }
      })).toEqual({
        loginStart: false,
        loginDone: true,
        isAuthenticated: false,
        error: new Error()
      });
    });
  });
});
