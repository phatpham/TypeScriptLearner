// import { useDispatch } from "react-redux";
// import { changeAvatar } from "../../actions/index";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./UserInfo.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loadUser } from "../../actions";

function UserInfo() {
  const dispatch = useDispatch();
  const userObj = useSelector(state => state.user);
  const history = useHistory();

  //TODO: ADD URL AND ACTION TO RESPOSNE

  const saveRequest = () => {
    axios
      .post("/save")
      .then(res => {})
      .catch(res => {
        alert("Loading Failure");
      });
  };

  const changeAvatar = avatarInput => {
    const newUserState = {
      username: userObj.username,
      password: userObj.password,
      progress: userObj.progress,
      user_id: userObj.user_id,
      avatar: avatarInput
    };
    dispatch(loadUser(newUserState));
  };

  useEffect(() => {
    changeAvatar("goblin");
  }, []);

  return (
    <div className="userinfopage">
      <div className="avatarholder">
        <img
          alt
          src={"/static/" + userObj.avatar + ".png"}
          className="avatarimage"
        ></img>
        <div className="avatars">
          <button
            onClick={() => {
              changeAvatar("goblin");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/goblin1.png"></img>
          </button>
          <audio src=""></audio>
          <button
            onClick={() => {
              changeAvatar("fairy");
            }}
            className="avatarpic"
          >
            <img alt className="avicon" src="/static/fairy1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("wizard");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/wizard1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("witch");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/witch1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("ogre");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/ogre1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("troll");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/troll1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("assassin");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/assassin1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("archer");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/archer1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("elf");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/elf1.png"></img>
          </button>
          <button
            onClick={() => {
              changeAvatar("knight");
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/knight1.png"></img>
          </button>
        </div>
      </div>
      <div className="userinfoholder">
        <div className="usernameinfoholder">
          <h2 className="label">Username</h2>
          <h2 className="info" align="left">
            {userObj.username}
          </h2>
        </div>
        <div className="passwordinfoholder">
          <h2 className="label passwordlabel">Password</h2>
          <h2 type="password" className="info" align="left">
            ********
          </h2>

          <button
            onClick={() => {
              history.push("/reset");
            }}
            className="changepassword"
          >
            Change Password
          </button>
        </div>
        <div className="usernameinfoholder">
          <h2 className="label">Joined</h2>
          <h2 className="info" align="left">
            {"2/2/2"}
          </h2>
        </div>
        <div className="usernameinfoholder">
          <h2 className="label">Progress</h2>
          <h2 className="info" align="left">
            {userObj.progress + "%"}
          </h2>
        </div>
        <div className="infobuttons">
          <button
            onClick={() => {
              history.push("/game");
            }}
            className="infobutton"
          >
            Back
          </button>
          <button className="infobutton">Save</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
