import jwtDecode from "jwt-decode";
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../types/auth.type";
import updateObject from "../../utils/updateObject";

const initialState = {
  currentUser: null,
  error: null,
  signupStart: false,
  loginStart: false,
  signupDone: false,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_START:
      return updateObject(state, { signupStart: true });
    case SIGN_UP_SUCCESS:
      const { token: signupToken } = payload;
      sessionStorage.setItem("token", signupToken);
      const currentUser = jwtDecode(signupToken);
      return updateObject(state, {
        signupStart: false,
        signupDone: true,
        isAuthenticated: true,
        currentUser,
        error: null
      });
    case SIGN_UP_FAIL:
      return updateObject(state, {
        signupStart: false,
        signupDone: true,
        isAuthenticated: false,
        error: payload.error
      });
    case LOGIN_START:
      return updateObject(state, { loginStart: true });
    case LOGIN_SUCCESS:
      const { token: loginToken } = payload;
      const loggedInUser = jwtDecode(loginToken);
      return updateObject(state, {
        loginStart: false,
        loginDone: true,
        isAuthenticated: true,
        currentUser: loggedInUser,
        error: null
      });
    case LOGIN_FAIL:
      return updateObject(state, {
        loginStart: false,
        loginDone: true,
        isAuthenticated: false,
        error: payload.error
      });
    default:
      return state;
  }
};

export default reducer;
