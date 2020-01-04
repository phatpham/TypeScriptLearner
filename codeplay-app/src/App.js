import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserInfo from "./components/UserInfo/UserInfo";
import { BrowserRouter, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import { loadLoginStatus, loadUser, changeView } from "./actions";
import { useHistory } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const music = useSelector(state => state.music);
  const avatar = useSelector(state => state.avatar);

  useEffect(() => {
    const loginStatus = localStorage.getItem("loginStatus");
    const user = loginStatus ? localStorage.getItem("user") : "";

    dispatch(loadUser(user));
    if (loginStatus === "ON") {
      history.push("/login");
      //dispatch(changeView("GAME_PAGE"));
    }
  }, []);

  //ADD OTHER ROUTES HERE
  return (
    <React.Fragment>
      <audio id="background" autoPlay loop src="background.wav"></audio>
      <audio autoPlay id="character" src={avatar + ".wav"}></audio>
      <Route
        path="/login"
        render={routerProps => <Login routerProps={routerProps} />}
      ></Route>
      <Route
        path="/game"
        render={routerProps => <Game routerProps={routerProps} />}
      ></Route>
      <Route
        path="/user"
        render={routerProps => <UserInfo routerProps={routerProps} />}
      ></Route>
    </React.Fragment>
  );
}

export default App;
