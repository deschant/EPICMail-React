import axios from 'axios';
import { toast } from 'react-toastify';
import {
  POST_NEW_MESSAGE_START,
  POST_NEW_MESSAGE_SUCCESS,
  POST_NEW_MESSAGE_FAIL,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL
} from '../types/messages.type';

const userToken = sessionStorage.getItem('token');
// eslint-disable-next-line no-undef
const { API_URL } = process.env;

const newMessageStart = () => ({ type: POST_NEW_MESSAGE_START });
const newMessageFail = (error) => ({ type: POST_NEW_MESSAGE_FAIL, payload: { error } });
const newMessageSuccess = (message) => ({ type: POST_NEW_MESSAGE_SUCCESS, payload: { message } });
export const sendMessage = (newMessage) => async dispatch => {
  try {
    dispatch(newMessageStart());
    const { data } = await axios.post(`${API_URL}/messages`, { ...newMessage }, {
      headers: {
        token: userToken
      }
    });
    dispatch(newMessageSuccess(data.data[0]));
    toast.success('Message succesfully sent! ✅');
  } catch (error) {
    dispatch(newMessageFail(error));
  }
};

const fetchMessageStart = () => ({ type: FETCH_MESSAGES_START });
const fetchMessageFail = (error) => ({ type: FETCH_MESSAGES_FAIL, payload: { error } });
const fetchMessagesSuccess = (messages) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages }
});
export const fetchMessages = () => async dispatch => {
  dispatch(fetchMessageStart());
  try {
    const { data } = await axios.get(`${API_URL}/messages`, {
      headers: {
        token: userToken
      }
    });
    dispatch(fetchMessagesSuccess(data.data[0]));
  } catch (error) {
    dispatch(fetchMessageFail(error));
  }
};
