import loginStatusReducer from "./loginStatus";
import userReducer from "./user";
import musicReducer from "./music";

import { combineReducers } from "redux";
import tokenReducer from "./token";
import validatedReducer from "./validated";

const allReducers = combineReducers({
  loginStatus: loginStatusReducer,
  user: userReducer,
  music: musicReducer,
  token: tokenReducer,
  validated: validatedReducer
});

export default allReducers;
