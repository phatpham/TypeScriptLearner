import React, { Component, useState, useEffect } from "react";

import "./stopwatch.css";

function Stopwatch(prop) {
  const calculateTimeLeft = () => {
    const interval = +new Date() - +prop.start;
    let count = {};

    if (interval > 0) {
      count = {
        minutes: Math.floor((interval / 1000 / 60) % 60),
        seconds: Math.floor((interval / 1000) % 60)
      };
    }

    return count;
  };
  const [counter, setCounter] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setCounter(calculateTimeLeft());
    }, 1000);
  });

  return (
    <div className="stopwatch">
      <div></div>

      <div className="minOne">{counter.minutes}</div>
      <div>:</div>
      <div className="secTwo">{Math.floor(counter.seconds / 10)}</div>
      <div className="secTwo">{counter.seconds % 10}</div>
    </div>
  );
}

export default Stopwatch;
