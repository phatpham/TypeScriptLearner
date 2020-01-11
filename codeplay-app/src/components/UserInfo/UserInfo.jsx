// import { useDispatch } from "react-redux";
// import { changeAvatar } from "../../actions/index";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./UserInfo.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loadUser, updateAvatar } from "../../actions";

function UserInfo() {
  const dispatch = useDispatch();
  const userObj = useSelector(state => state.user);
  const history = useHistory();

  const avatar = useSelector(state => state.avatar);

  //TODO: ADD URL AND ACTION TO RESPOSNE

  const saveRequest = () => {
    axios
      .put("/user/update/avatar", {
        username: userObj.username,
        avatar: avatar
      })
      .then(res => {
        changeAvatar(avatar);
      })
      .catch(res => {
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
    if (userObj.avatar === null) {
      changeAvatar("goblin");
    } else {
      dispatch(updateAvatar(userObj.avatar));
    }

    // axios
    //   .post()
    //   .then(res => {})
    //   .catch(res => {
    //     history.push("/unauthorized");
    //   });
  }, []);

  return (
    <div className="userinfopage">
      <div className="avatarholder">
        <img
          alt
          src={"/static/" + avatar + ".png"}
          className="avatarimage"
        ></img>
        <div className="avatars">
          <button
            type="button"
            onClick={() => {
              dispatch(updateAvatar("goblin"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/goblin1.png"></img>
          </button>
          <audio src=""></audio>
          <button
            onClick={() => {
              dispatch(updateAvatar("fairy"));
            }}
            className="avatarpic"
          >
            <img alt className="avicon" src="/static/fairy1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("wizard"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/wizard1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("witch"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/witch1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("ogre"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/ogre1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("troll"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/troll1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("assassin"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/assassin1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("archer"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/archer1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("elf"));
            }}
            className="avatarpic"
          >
            <img alt="#" className="avicon" src="/static/elf1.png"></img>
          </button>
          <button
            onClick={() => {
              dispatch(updateAvatar("knight"));
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
            className="changepassword userinfo-btn"
          >
            Change Password
          </button>
        </div>
        <div className="usernameinfoholder">
          <h2 className="label">Progress</h2>
          <h2 className="info" align="left">
            {Math.round((userObj.progress / 9) * 100) + "%"}
          </h2>
        </div>
        <div className="usernameinfoholder">
          <h2 className="label"></h2>
          <h2 className="info" align="left"></h2>
        </div>
        <div className="usernameinfoholder">
          <button
            onClick={() => {
              history.push("/game");
            }}
            className="infobutton userinfo-btn"
          >
            Back
          </button>
          <button
            onClick={() => {
              saveRequest();
            }}
            className="infobutton userinfo-btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
