import React, { useState, useEffect } from "react";
import "./ResetPassword.css";

import Validator from "../ValidationSet/Validator";
import { useHistory } from "react-router-dom";
import { loadUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ResetPassword() {
  const history = useHistory();
  const [showValidator, setShowValidator] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const userPass = useSelector(state => state.userPass);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const validated = useSelector(state => state.validated);
  const userObj = useSelector(state => state.user);
  const dispatch = useDispatch();

  const resetRequest = () => {
    if (validated === true) {
      axios
        .put("/user/update", {
          old_password: oldPass,
          new_password: newPass,
          username: userObj.username
        })
        .then(res => {
          console.log(res.data.message);

          history.push("/user");
        })
        .catch(res => {
          console.log(res.message);
        });
    }
  };

  /**
   * Validation on the new password
   */
  // const isInputValid = () => {
  //   if (oldPass !== userPass) {
  //     alert("Your Old Password is Incorrect");
  //     return false;
  //   } else if (newPass === oldPass) {
  //     alert("Your new password is same as your old password!");
  //     return false;
  //   } else if (newPass !== confirmPass) {
  //     alert("New Passwords do not match.");
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div className="resetpassword">
      <div className="innerreset">
        <h5>Reset password</h5>
        <input
          onChange={e => {
            setOldPass(e.target.value);
          }}
          value={oldPass}
          className="passwordinput"
          type="password"
          placeholder="Enter original password"
        ></input>
        <input
          onFocus={() => {
            setShowValidator(true);
          }}
          onBlur={() => setShowValidator(false)}
          onChange={e => {
            setNewPass(e.target.value);
          }}
          value={newPass}
          className="passwordinput"
          type="password"
          placeholder="Enter new password"
        ></input>
        <input
          onChange={e => {
            setConfirmPass(e.target.value);
          }}
          onFocus={() => {
            setShowValidator(true);
          }}
          onBlur={() => setShowValidator(false)}
          value={confirmPass}
          className="passwordinput"
          type="password"
          placeholder="Confirm new password"
        ></input>
        <div className="inline-buttons">
          <button
            onClick={() => {
              resetRequest();
            }}
            type="button"
            className="savepassword"
          >
            Save new password
          </button>

          <button
            className="savepassword"
            onClick={() => {
              history.push("/user");
            }}
          >
            Back
          </button>
        </div>
        <Validator
          password={newPass}
          confirmPass={confirmPass}
          show={showValidator}
        />
      </div>
    </div>
  );
}

export default ResetPassword;
