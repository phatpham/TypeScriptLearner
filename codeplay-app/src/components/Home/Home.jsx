import React, { useState, useEffect } from "react";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "./Home.css";
import axios from "axios";

import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const login = () => {
    history.push("/login");
  };

  const singup = () => {
    history.push("/singup");
  };

  return (
    <div className="home">
      <div className="centered-p">
        <h2>Welcome apprentice,</h2>
        <br />
        <p className="storytext" align="justify">
        The Lustrous Expanse was a peaceful land. In the Lustrous Expanse, there were three kingdoms. The Kingdom of Men, Dressudale - the Kingdom of the Elves, and Creottenia - the Kingdom of Goblins. The three kingdoms lived in harmony with each other. Well. Most of the time. The goblins were a treacherous lot that was constantly trying to take over the other kingdoms but were yet to succeed.
        <br></br>
        On the outskirts of the Lustrous Expanse, was a giant, largely unexplored forest. Of all the beings that had ventured into the forest, none had made it back alive.
        <br></br>
        Peace in the land had lasted for almost a hundred years. However, all that was soon about to change.
        <br></br>
        It was the night of the full moon. The tragic news of the death of the elven princess reached the Kingdom of Men. Distraught, the king called a council meeting. The king informed the people in the courtroom of the shocking news of the death of the elven princess.
        <br></br>
        “I am heartbroken to say, that it was one of the knights that killed the princess. The knights that have lead us into countless battles alongside the elves. One of the knights has betrayed their oath to the kingdom. The accused will be banished to the forest. Never to return,” the king announces to the courtroom as he walks down the aisle. “I am so disappointed it was you. Now you have to spend the rest of his life banished from The Expanse”, the king declared as he points to a knight in the first row.   
        </p>
      </div>
      <div className="loginbuttons">
        <button
          onClick={() => {
            login();
          }}
          className="loginbutton"
        >
          Log In
        </button>
        <button
          onClick={() => {
            singup();
          }}
          className="signup"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
export default Home;
