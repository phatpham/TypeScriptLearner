import React, { Component, useState, useEffect } from "react";

import "./stopwatch.css";

function Stopwatch() {
  const [counter, setCounter] = useState("00:00:00");
  const [start, setStart] = useState(new Date("2020-01-01"));

  return <div className="stopwatch">{counter}</div>;
}

export default Stopwatch;
