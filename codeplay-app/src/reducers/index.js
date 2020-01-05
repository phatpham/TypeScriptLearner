import avatarReducer from "./avatar";
import loginStatusReducer from "./loginStatus";
import userReducer from "./user";
import musicReducer from "./music";

import { combineReducers } from "redux";
import tokenReducer from "./token";

const allReducers = combineReducers({
  avatar: avatarReducer,
  loginStatus: loginStatusReducer,
  user: userReducer,
  music: musicReducer,
  token: tokenReducer
});

export default allReducers;
