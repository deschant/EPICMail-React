import {
  POST_NEW_MESSAGE_START,
  POST_NEW_MESSAGE_SUCCESS,
  POST_NEW_MESSAGE_FAIL
} from '../types/messages.type';
import updateObject from "../../utils/updateObject";

const initialState = {
  error: null,
  postMessageStart: false,
  postMessageDone: false,
  message: null
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
    default:
      return state;
  }
};

export default reducer;
