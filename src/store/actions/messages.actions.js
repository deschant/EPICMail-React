import axios from 'axios';
import { toast } from 'react-toastify';
import {
  POST_NEW_MESSAGE_START,
  POST_NEW_MESSAGE_SUCCESS,
  POST_NEW_MESSAGE_FAIL
} from '../types/messages.type';

const userToken = sessionStorage.getItem('token');
// eslint-disable-next-line no-undef
const { LOCAL_API_URL: API_URL } = process.env;

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

export const fetchMessages = (email) => async dispatch => { };
