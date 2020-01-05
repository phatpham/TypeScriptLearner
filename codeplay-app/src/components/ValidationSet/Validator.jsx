import React, { Component, useEffect, useState } from "react";
import "./Validator.css";
import { updateValidated } from "../../actions";
import { useDispatch } from "react-redux";

function Validator(prop) {
  const dispatch = useDispatch();
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [num, setNum] = useState(false);
  const [txtLength, setTxtLength] = useState(false);
  const [matching, setMatching] = useState(false);
  const password = prop.password;
  const confirmPass = prop.confirmPass;

  useEffect(() => {
    lowerCaseValidator();
    upperCaseValidator();
    numberValidator();
    lengthValidator();
    matchPassValidator();
    console.log(lowerCase && upperCase && num && matching && txtLength);
    dispatch(
      updateValidated(lowerCase && upperCase && num && matching && txtLength)
    );
  });

  const lowerCaseValidator = () => {
    var lowerCaseLetters = /[a-z]/g;
    if (password.match(lowerCaseLetters)) {
      setLowerCase(true);
    } else {
      setLowerCase(false);
    }
  };

  const upperCaseValidator = () => {
    var upperCaseLetters = /[A-Z]/g;
    if (password.match(upperCaseLetters)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
  };

  const numberValidator = () => {
    var numbers = /[0-9]/g;
    if (password.match(numbers)) {
      setNum(true);
    } else {
      setNum(false);
    }
  };

  const lengthValidator = () => {
    var length = /[0-9]/g;
    if (password.length >= 8) {
      setTxtLength(true);
    } else {
      setTxtLength(false);
    }
  };

  const matchPassValidator = () => {
    if (password === confirmPass) {
      setMatching(true);
    } else {
      setMatching(false);
    }
  };

  return (
    <div hidden={!prop.show} className="validator">
      <h3>Password must have:</h3>
      <p
        className={lowerCase === false ? "notFulfilled" : "fulfilled"}
        id="lowercase"
      >
        At least one lowercase letter
      </p>
      <p
        className={upperCase === false ? "notFulfilled" : "fulfilled"}
        id="uppercase"
      >
        At least one uppercase letter
      </p>
      <p className={num === false ? "notFulfilled" : "fulfilled"} id="number">
        At least one number
      </p>
      <p
        className={txtLength === false ? "notFulfilled" : "fulfilled"}
        id="length"
      >
        At least 8 characters long
      </p>

      <p
        className={matching === false ? "notFulfilled" : "fulfilled"}
        id="length"
      >
        'Password' and 'Confirm Password' match
      </p>
    </div>
  );
}
export default Validator;
