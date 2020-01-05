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
  const userObj = useSelector(state => state.user);
  const history = useHistory();
  const [answerMode, setAnswerMode] = useState("EDITOR"); // EDITOR/DRAG
  const dispatch = useDispatch();

 
  const [template, setTemplate] = useState("console.log(\"Hello world\");\nconsole.log(3+2);");
 

  const [chapters, setChapters] = useState([
    
  ]);

  const [unit, setUnit] = useState(2);
  const [latest, setLatest] = useState(4);
  const [story, setStory] = useState("One day everybody died.");
  const [instructions, setInstructions] = useState([
    "Write some stuff",
    "Change some stuff"
  ]);
  const [output, setOutput] = useState("Hello world");
  const [solution, setSolution] = useState("");
  const music = useSelector(state => state.music);
  const [redirect, setRedirect] = useState("false");
  const [options, setOptions] = useState({});

  //

  useEffect(() => {
    axios
      .post("http://localhost:5000/story/load")
      .then(res => {
        setChapters(res.data.message);
        axios.post("http://localhost:5000/story/load/5").then(res => {
          setInstructions(res.data.instruction);
          setStory(res.data.storyDescription);
          setOptions({
            one: res.data.option_1,
            two: res.data.option_2,
            three: res.data.option_3,
            four: res.data.option_4
          });
          setAnswerMode(res.data.option_1 === null ? "EDITOR" : "DRAG");
        });
      })
      .catch(res => {
        alert("Loading Error");
      });
  }, []);


  // send request to server to run code.
  function runCode() {}

  function onChange(newValue) {
    setCode(newValue);
  }

  function restart() {
    setCode(template);
  }



  const logoff = () => {
    localStorage.removeItem("access_token");
  };

  const stopSound = () => {
    const backgroundMusic = document.getElementById("background");
    const characterMusic = document.getElementById("character");
    backgroundMusic.muted = music;
    characterMusic.muted = music;
  };

  let chaptArray = [];

  return (
    <div className="gamepage">
      <div className="chapters">
        {chapters.forEach((c, i) => {
          chaptArray.push(
            <div
              onClick={() => {
                // setLatest();
              }}
              className={
                unit === i
                  ? "chapterholder current"
                  : latest > i
                  ? "chapterholder done"
                  : latest === i
                  ? "chapterholder pending"
                  : "chapterholder"
              }
            >
              {c}
            </div>
          );
        })}
        {chaptArray}
      </div>
      <div className="logo">
        <h3>Code & Play</h3>
        <button className="leaderboard-btn btn white-btn">Leaderboard</button>
      </div>
      <div className="userinfotag">
        <div className="volume">
          <input
            type="image"
            src={music == true ? "/static/speaker.png" : "/static/mute.png"}
            className="btn-sound btn white-btn"
            onClick={() => {
              dispatch(changeMusicState(music));
              stopSound();
            }}
          />
        </div>
        <div className="userinfodiv">
          <p>{userObj.username}</p>
          <button
            onClick={() => {
              history.push("/user");
              // dispatch(changeView("USER_INFO_PAGE"));
            }}
            className="userinfo btn toprightbtn"
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
            className="btn-log-off btn toprightbtn"
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
          <p>{instructions}</p>
        </div>
        <button className="solutiontag white-btn">Solution</button>
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
            value={code}
            onChange = {onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        ) : (
          <DragDrop options={options} />
        )}
        <div className="codebuttons">
          <button
            onClick={() => {
              setUnit((unit + 1) % 14);
            }}
            className="codebutton btn white-btn"
          >
            Run
          </button>
          <button
            onClick={() => {
              restart();
            }}
            className="codebutton btn white-btn"
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
