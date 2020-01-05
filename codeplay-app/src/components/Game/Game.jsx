import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "./Game.css";
import axios from "axios";
import DragDrop from "./DragDrop";
import Stopwatch from "./stopwatch";
import { changeMusicState } from "../../actions/";
import { useHistory } from "react-router-dom";

function Game() {
  const history = useHistory();
  const [answerMode, setAnswerMode] = useState("EDITOR"); // EDITOR/DRAG
  const dispatch = useDispatch();
  const [chapters, setChapters] = useState(["First program","Type annotation","Variables","Numbers","Strings","Boolean","Array"]);
  const [code, setCode] = useState("console.log(\"Hello world\");\nconsole.log(3+2);");
  const [unit, setUnit] = useState(2);
  const [latest, setLatest] = useState(4);
  const [story, setStory] = useState("One day everybody died.");
  const [instructions, setInstructions] = useState(["Write some stuff","Change some stuff"]);
  const [output, setOutput] = useState("Hello world");
  const [solution, setSolution] = useState("");
  const music = useSelector(state => state.music);
  const [redirect, setRedirect] = useState("false");

  // send request to server to run code.
  function runCode() {}

  function onChange(newValue) {
    setCode(newValue);
  }

  function restart() {
    setCode("");
  }

  // useEffect(() => {
  //   axios
  //     .get("/load/game")
  //     .then(res => {
  //       setStory(res.data.story);
  //       setSolution(res.data.solution);
  //       setUnit(res.data.unit);
  //     })
  //     .catch(res => {
  //       alert("loading failure");
  //     }, []);
  // });

  const logoff = () => {
    localStorage.setItem("user", "");
    localStorage.setItem("loginStatus", "OFF");
  };

  const stopSound = () => {
    const backgroundMusic = document.getElementById("background");
    const characterMusic = document.getElementById("character");
    backgroundMusic.muted = music;
    characterMusic.muted = music;
  };

  let instrArray = [];
  let chaptArray = [];

  return (
    <div className="gamepage">
      <div className="chapters">
        {chapters.forEach((c,i) => {
          chaptArray.push(<div className={unit === i ? "chapterholder current" : latest > i ? "chapterholder done" : latest === i ? "chapterholder pending" : "chapterholder"}>{c}</div>);
        })}
        {chaptArray}
      </div>
      <div className="logo">
        <h3>Code & Play</h3>
        <button className="leaderboard-btn">Leaderboard</button>
      </div>
      <div className="userinfotag">
        <div className="volume">
          <input
            type="image"
            src={music == true ? "/static/speaker.png" : "/static/mute.png"}
            class="btn-sound"
            onClick={() => {
              dispatch(changeMusicState(music));
              stopSound();
            }}
          />
        </div>
        <div className="userinfodiv">
          <button
            onClick={() => {
              history.push("/user");
              // dispatch(changeView("USER_INFO_PAGE"));
            }}
            className="userinfo"
          >
            User info
          </button>
        </div>
        <div className="logoffdiv">
          <button
            onClick={() => {
              logoff();
              history.push("/");
            }}
            className="btn-log-off"
          >
            LOG OFF
          </button>
        </div>
      </div>
      <div className="story">
        <p className="storytext" align="justify">
          {story}
        </p>
      </div>
      <div className="instructionssolution">
        <div className="instructions" align="left">
          <ol>
            {instructions.forEach(s => {
              instrArray.push(<li>{s}</li>);
            })}
            {instrArray}
          </ol>
        </div>
        <button className="solutiontag">Solution</button>
      </div>
      <div className="code">
        {/* <AceEditor
          mode="typescript"
          theme="monokai"
          name="code"
          fontSize={15}
          height="280px"
          width="560px"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
         */}
        {answerMode === "EDITOR" ? (
          <AceEditor
            mode="typescript"
            theme="monokai"
            name="code"
            fontSize={15}
            height="280px"
            width="560px"
            onChange={onChange}
            value={code}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        ) : (
          <DragDrop />
        )}
        <div className="codebuttons">
          <button
            onClick={() => {
              setUnit((unit + 1) % 14);
            }}
            className="codebutton"
          >
            Run
          </button>
          <button
            onClick={() => {
              setCode("");
            }}
            className="codebutton"
          >
            Restart
          </button>
          <Stopwatch start={new Date()} />
        </div>
      </div>
      <div className="output">
        <p>{output}</p>
      </div>
    </div>
  );
}

export default Game;
