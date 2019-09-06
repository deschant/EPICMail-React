import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import messageReducer from "./messages.reducer";

export default combineReducers({
  authReducer,
  messageReducer
});
