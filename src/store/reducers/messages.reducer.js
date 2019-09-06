import {
  POST_NEW_MESSAGE_START,
  POST_NEW_MESSAGE_SUCCESS,
  POST_NEW_MESSAGE_FAIL,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL
} from '../types/messages.type';
import updateObject from "../../utils/updateObject";

const initialState = {
  error: null,
  postMessageStart: false,
  postMessageDone: false,
  message: null,
  fetchMessageStart: false,
  fetchMessageDone: false,
  messages: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_NEW_MESSAGE_START:
      return updateObject(state, { postMessageStart: true, postMessageDone: false });
    case POST_NEW_MESSAGE_SUCCESS:
      return updateObject(state, { postMessageDone: true, message: payload.message });
    case POST_NEW_MESSAGE_FAIL:
      return updateObject(state, { postMessageDone: true, error: payload.error });
    case FETCH_MESSAGES_START:
      return updateObject(state, { fetchMessageStart: true, fetchMessageDone: false });
    case FETCH_MESSAGES_SUCCESS:
      return updateObject(state, { fetchMessageDone: true, messages: payload.messages });
    case FETCH_MESSAGES_FAIL:
      return updateObject(state, { fetchMessageDone: true, error: payload.error });
    default:
      return state;
  }
};

export default reducer;
