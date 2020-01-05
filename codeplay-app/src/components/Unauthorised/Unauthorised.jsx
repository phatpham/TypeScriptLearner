import React, { Component, useEffect, useState } from "react";
import "./Unauthorised.css";

function Unauthorised() {
    return (
        <div className="unauthorised">
            <div className="errorcode">
                <h1>401</h1>
            </div>
            <div className="instruct">
                <p>Slow down, knight. You do not possess the rights to roam this realm.</p>
            </div>
            <div className="gologin">
                <p>Click here to login.</p>
            </div>
        </div>
    );
}

export default Unauthorised;