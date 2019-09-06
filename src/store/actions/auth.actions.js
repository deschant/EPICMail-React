/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import axios from "axios";
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../types/auth.type";

const { API_URL } = process.env;

const signupStart = () => ({ type: SIGN_UP_START });
const signupFail = error => ({ type: SIGN_UP_FAIL, payload: { error } });
const signupSuccess = token => ({ type: SIGN_UP_SUCCESS, payload: { token } });
export const signup = newUser => async dispatch => {
  try {
    dispatch(signupStart());
    const { data } = await axios.post(`${API_URL}/auth/signup`, { ...newUser });
    sessionStorage.setItem('token', data.data[0].token);
    dispatch(signupSuccess(data.data[0].token));
  } catch (error) {
    toast.error('Oops, Try your luck again 😅');
    dispatch(signupFail(error));
  }
};

const loginStart = () => ({ type: LOGIN_START });
const loginFail = error => ({ type: LOGIN_FAIL, payload: { error } });
const loginSuccess = token => ({ type: LOGIN_SUCCESS, payload: { token } });
export const login = credentials => async dispatch => {
  try {
    dispatch(loginStart());
    const { data } = await axios.post(`${API_URL}/auth/signin`, { ...credentials });
    sessionStorage.setItem('token', data.data[0].token);
    dispatch(loginSuccess(data.data[0].token));
  } catch (error) {
    toast.error('Oops, Try your luck again 😅');
    dispatch(loginFail(error));
  }
};
