import React, { Component, useEffect } from "react";

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
    <div hidden={!prop.show} id="message">
      Hello
    </div>
  );
}
export default Validator;
