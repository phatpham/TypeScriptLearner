// import { useDispatch } from "react-redux";
// import { changeAvatar } from "../../actions/index";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./UserInfo.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { changeAvatar } from "../../actions";

function UserInfo() {
  const dispatch = useDispatch();

  const history = useHistory();

  const username = "xhao98";
  // const password = "123123";
  const date = "2013/01/01";
  const avatar = useSelector(state => state.avatar);
  const progress = 22;

  //TODO: ADD URL AND ACTION TO RESPOSNE

  const saveRequest = () => {
    axios
      .post("/save")
      .then(res => {})
      .catch(res => {
        alert("Loading Failure");
      });
  };

  useEffect(() => {
    dispatch(changeAvatar("goblin"));
  }, []);

  return (
    <div className="userinfopage">
      {/* <audio autoPlay id="audio" src={avatar + ".wav"}></audio> */}
      <div className="avatarholder">
        <img
          alt
          src={"/static/" + avatar + ".png"}
          className="avatarimage"
        ></img>
        <div className="avatars">
          <button
            onClick={() => {
              dispatch(changeAvatar("goblin"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/goblin1.png"></img>
          </button>
          <audio src=""></audio>
          <button
            onClick={() => {
              dispatch(changeAvatar("fairy"));
            }}
            className="avatarpic"
          >
            <img alt className="avicon" src="/static/fairy1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("wizard"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/wizard1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("witch"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/witch1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("ogre"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/ogre1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("troll"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/troll1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("assassin"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/assassin1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("archer"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/archer1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("elf"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/elf1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(changeAvatar("knight"));
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
            {username}
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
            {date}
          </h2>
        </div>
        <div className="usernameinfoholder">
          <h2 className="label">Progress</h2>
          <h2 className="info" align="left">
            {progress + "%"}
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
