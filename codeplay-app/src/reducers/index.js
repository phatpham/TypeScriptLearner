import loginStatusReducer from "./loginStatus";
import userReducer from "./user";
import musicReducer from "./music";

import { combineReducers } from "redux";
import tokenReducer from "./token";
import validatedReducer from "./validated";
import timerReducer from "./timer";

const allReducers = combineReducers({
  loginStatus: loginStatusReducer,
  user: userReducer,
  music: musicReducer,
  token: tokenReducer,
  validated: validatedReducer,
  timer: timerReducer
});

export default allReducers;
