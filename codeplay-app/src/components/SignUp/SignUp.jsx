import React, { useState } from "react";
import "../Login/Login.css";
import Validator from "../ValidationSet/Validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const history = useHistory();
  const validated = useSelector(state => state.validated);
  const [showValidator, setShowValidator] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const signupRequest = () => {
    if (validated === true && user.length > 0) {
      axios
        .post("/user/signup", {
          username: user,
          password: pass
        })
        .then(res => {
          console.log("ok");
          console.log(res.data.message);
          history.push("/login");
        })
        .catch(res => {
          console.log("Not Okay");
        });
    }
  };

  return (
    <div className="loginpage">
      <div className="innerlogin">
        <h1>CODE & PLAY</h1>
        <input
          onChange={e => {
            setUser(e.target.value);
          }}
          value={user}
          type="text"
          className="logininput"
          placeholder="Username"
        ></input>
        <input
          onFocus={() => {
            setShowValidator(true);
          }}
          onBlur={() => setShowValidator(false)}
          onChange={e => {
            setPass(e.target.value);
          }}
          value={pass}
          type="password"
          className="logininput"
          placeholder="Password"
        ></input>
        <input
          type="password"
          onChange={e => {
            setConfirmPass(e.target.value);
          }}
          onFocus={() => {
            setShowValidator(true);
          }}
          onBlur={() => setShowValidator(false)}
          value={confirmPass}
          className="logininput"
          placeholder="Retype password"
        ></input>
        <div className="loginbuttons">
          <button
            onClick={() => {
              signupRequest();
            }}
            type="button"
            className="loginbutton"
          >
            Sign Up
          </button>

          <button
            onClick={() => {
              history.push("/login");
            }}
            className="signup back"
          >
            Back
          </button>
        </div>
        <Validator
          confirmPass={confirmPass}
          password={pass}
          show={showValidator}
        />
      </div>
    </div>
  );
}

export default SignUp;
