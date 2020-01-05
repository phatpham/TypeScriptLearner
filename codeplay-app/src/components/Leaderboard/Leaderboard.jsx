import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [state, setState] = useState({
    level: "Type inference",
    leaders: [
      {
        name: "#1 xhao98",
        time: "56s"
      },
      {
        name: "#2 duxhispanni",
        time: "1m 02s"
      },
      {
        name: "#3 suyash",
        time: "1m 45s"
      },
      {
        name: "#4 sanjee",
        time: "1m 48s"
      },
      {
        name: "#5 adrian",
        time: "1m 49s"
      },
      {
        name: "#6 phat",
        time: "1m 51s"
      },
      {
        name: "#7 dd",
        time: "2m 05s"
      },
      {
        name: "#8 master",
        time: "2m 30s"
      },
      {
        name: "#9 brend",
        time: "3m 10s"
      }
    ]
  });

  let leaderArray = [];

  return (
    <div className="leaderboard">
      <div className="leadertop">
        <div className="back">
          <button className="back-btn">Back</button>
        </div>
        <div className="leaderlevel">
          <h2>Level: {state.level}</h2>
        </div>
      </div>
      {state.leaders.forEach(l => {
        leaderArray.push(
          <div className="leaderdiv">
            <p className="leaderuser">{l.name}</p>
            <p className="leadertime">{l.time}</p>
          </div>
        );
      })}
      {leaderArray}
    </div>
  );
}

export default Leaderboard;
