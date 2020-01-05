import React, { Component, useState, useEffect } from "react";
import { updateTimer } from "../../actions";
import "./stopwatch.css";
import { useSelector, useDispatch } from "react-redux";

function Stopwatch(prop) {
  const dispatch = useDispatch();
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

  const counter = useSelector(state => state.timer);

  useEffect(() => {
    setTimeout(() => {
      const temp = calculateTimeLeft();
      dispatch(updateTimer(temp));
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
