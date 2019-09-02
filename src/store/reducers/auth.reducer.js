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
  signupStart: false,
  signupDone: false,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_START:
      return updateObject(state, { signupStart: true });
    case SIGN_UP_SUCCESS:
      const { token } = payload;
      sessionStorage.setItem("token", token);
      const currentUser = jwtDecode(token);
      return updateObject(state, {
        signupStart: false,
        signupDone: true,
        isAuthenticated: true,
        currentUser
      });
    case SIGN_UP_FAIL:
      return updateObject(state, {
        signupStart: false,
        signupDone: true,
        isAuthenticated: false,
        error: payload.error
      });
    default:
      return state;
  }
};

export default reducer;
