import React, { Component } from "react";

function Validator() {
  return (
    <div id="message">
      <h3>Password must contain the following:</h3>
      <p id="letter" class="invalid">
        A <b>lowercase</b> letter
      </p>
      <p id="capital" class="invalid">
        A <b>capital (uppercase)</b> letter
      </p>
      <p id="number" class="invalid">
        A <b>number</b>
      </p>
      <p id="length" class="invalid">
        Minimum <b>8 characters</b>
      </p>
    </div>
  );
}
export default Validator;
