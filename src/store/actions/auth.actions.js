import axios from "../../utils/axiosCustom";
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../types/auth.type";

const signupStart = () => ({ type: SIGN_UP_START });
const signupFail = error => ({ type: SIGN_UP_FAIL, payload: { error } });
const signupSuccess = token => ({ type: SIGN_UP_SUCCESS, payload: { token } });
export const signup = newUser => async dispatch => {
  try {
    dispatch(signupStart());
    const { data } = await axios.post("/auth/signup", { ...newUser });
    dispatch(signupSuccess(data.data[0].token));
  } catch (error) {
    dispatch(signupFail(error));
  }
};

const loginStart = () => ({ type: LOGIN_START });
const loginFail = error => ({ type: LOGIN_FAIL, payload: { error } });
const loginSuccess = token => ({ type: LOGIN_SUCCESS, payload: { token } });
export const login = newUser => async dispatch => {
  try {
    dispatch(loginStart());
    const { data } = await axios.post("/auth/signup", { ...newUser });
    dispatch(loginSuccess(data[0].token));
  } catch (error) {
    dispatch(loginFail(error));
  }
};
