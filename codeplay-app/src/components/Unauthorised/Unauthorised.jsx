import React, { Component } from "react";
import "./Unauthorised.css";

function Unauthorised() {
  return (
    <div className="unauthorised">
      <div>
        <div className="errorcode">
          <h1>401</h1>
        </div>
        <div className="instruct">
          <p>
            Slow down, knight. You do not possess the rights to roam this realm.
          </p>
        </div>
        <div className="gologin">
          <p>
            Click here to <a href="/login">login</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorised;
