import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard(props) {
  let leaderArray = [];
  const back = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  };

  return (
    <div className="leaderboard" id="modal">
      <div className="leadertop">
        <div className="back">
          <button
            className="back-btn"
            onClick={() => {
              back();
            }}
          >
            Back
          </button>
        </div>
        <div className="leaderlevel">
          <h2>Level: {props.level}</h2>
        </div>
      </div>
      <div className="leaders">
        {props.leaders.forEach((l, i) => {
          leaderArray.push(
            <div className="leaderdiv">
              <p className="leaderuser">{"#" + (i + 1) + " " + l.name}</p>
              <p className="leadertime">
                {Math.floor(l.time / 60) + "min " + (l.time % 60) + "s"}
              </p>
            </div>
          );
        })}
        {leaderArray}
      </div>
    </div>
  );
}

export default Leaderboard;
