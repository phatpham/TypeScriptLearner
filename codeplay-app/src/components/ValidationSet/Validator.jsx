
import React, { Component } from "react";
import "./Validator.css"

function Validator(prop) {
    
  const password = prop.password;
  useEffect(() => {
    lowerCaseValidator();
    upperCaseValidator();
    numberValidator();
    lengthValidator();
  }, []);

  const lowerCaseValidator = () => {
    var lowerCaseLetters = /[a-z]/g;
    if (password.match(lowerCaseLetters)) {
      return true;
    }
    return false;
  };

  const upperCaseValidator = () => {
    var upperCaseLetters = /[A-Z]/g;
    if (password.match(upperCaseLetters)) {
      return true;
    }
    return false;
  };

  const numberValidator = () => {
    var numbers = /[0-9]/g;
    if (password.match(numbers)) {
      return true;
    }
    return false;
  };

  const lengthValidator = () => {
    var length = /[0-9]/g;
    if (password.length >= 8) {
      return true;
    }
    return false;
  };

  return (
    
<div hidden={!prop.show} className="validator">
      <h3>Password must have:</h3>
      <p className="notFulfilled" id="lowercase">
        At least one lowercase letter
      </p>
      <p className="notFulfilled" id="uppercase">
        At least one uppercase letter
      </p>
      <p className="notFulfilled" id="number">
        At least one number
      </p>
      <p className="notFulfilled" id="length">
        At least 8 characters long
      </p>
    </div>
  );
}
export default Validator;