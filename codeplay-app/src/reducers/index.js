import avatarReducer from "./avatar";
import loginStatusReducer from "./loginStatus";
import userReducer from "./user";
import musicReducer from "./music";

import { combineReducers } from "redux";
import { login } from "../actions";

const allReducers = combineReducers({
  avatar: avatarReducer,
  loginStatus: loginStatusReducer,
  user: userReducer,
  music: musicReducer
});

export default allReducers;
