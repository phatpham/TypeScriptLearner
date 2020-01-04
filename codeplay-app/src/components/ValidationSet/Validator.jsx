import React, { Component } from "react";
import "./Validator.css"

function Validator(prop) {
  return (
    <div className="validator">
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