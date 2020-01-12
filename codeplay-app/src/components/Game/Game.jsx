import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "./Game.css";
import axios from "axios";
import DragDrop from "./DragDrop";
import Leaderboard from "./Leaderboard";
import Stopwatch from "./stopwatch";
import { changeMusicState, updateTimer, loadUser } from "../../actions/";
import { useHistory } from "react-router-dom";

function Game() {
  const userObj = useSelector(state => state.user);
  const history = useHistory();
  const [answerMode, setAnswerMode] = useState("EDITOR"); // EDITOR/DRAG
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const timer = useSelector(state => state.timer);
  const [start, setStart] = useState(new Date());

  const [template, setTemplate] = useState(
    'console.log("Hello world");\nconsole.log(3+2);'
  );

  const [chapters, setChapters] = useState([]);

  const [unit, setUnit] = useState(1);

  const [story, setStory] = useState("One day everybody died.");
  const [instructions, setInstructions] = useState([
    "Write some stuff",
    "Change some stuff"
  ]);
  const [output, setOutput] = useState("Hello Knight");
  const [solution, setSolution] = useState("");
  const music = useSelector(state => state.music);
  const [redirect, setRedirect] = useState("false");
  const [options, setOptions] = useState({});
  const [leaders, setLeaders] = useState([]);

  function requestLeaderBoard(unit) {
    axios
      .post("/leaderboard/" + unit)
      .then(res => {
        console.log(res.data.list);
        setLeaders(res.data.list);

        var m = document.getElementById("modal");
        m.style.display = "block";
      })
      .catch(res => {
        console.log("Failed Loading LeaderBoard");
      });
  }

  const loadChapter = chapterID => {
    setStart(new Date());
    if (chapterID <= userObj.progress + 1) {
      axios.post("/story/load/" + chapterID).then(res => {
        setInstructions(res.data.instruction);
        setStory(res.data.storyDescription);
        setOptions({
          one: res.data.option_1,
          two: res.data.option_2,
          three: res.data.option_3,
          four: res.data.option_4
        });
        setUnit(chapterID);
        setAnswerMode(res.data.option_1 === null ? "EDITOR" : "DRAG");
        dispatch(updateTimer({ minutes: 0, seconds: 0 }));
      });
    }
  };

  function restart() {
    setCode("");
  }

  function onchange(value) {
    setCode(value);
  }
  useEffect(() => {
    axios
      .post("/story/load")
      .then(res => {
        setChapters(res.data.message);
        axios.post("/story/load/" + unit).then(res => {
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
        console.log("Loading Error");
      });
  }, []);

  // send request to server to run code.
  function runCode(code) {
    axios
      .post("/game/execute/" + unit, {
        username: userObj.username,
        time: timer.minutes * 60 + timer.seconds,
        input_code: code
      })
      .then(res => {
        console.log(res.data.message);
        setOutput(res.data.message);
        dispatch(
          loadUser({
            username: userObj.username,
            password: userObj.password,
            progress: res.data.progress,
            user_id: userObj.user_id,
            avatar: userObj.avatar
          })
        );
        console.log(userObj);
      })
      .catch(res => {
        console.log("Not Working");
      });
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
      {console.log(leaders)}
      <Leaderboard level="Leaderboard For Current Level" leaders={leaders} />
      <div className="chapters">
        {chapters.forEach(c => {
          chaptArray.push(
            <button
              onClick={() => {
                loadChapter(c.id);
              }}
              className={
                unit === c.id
                  ? "chapterholder current"
                  : userObj.progress + 1 > c.id
                  ? "chapterholder done"
                  : userObj.progress + 1 === c.id
                  ? "chapterholder pending"
                  : "chapterholder"
              }
            >
              {c.name}
            </button>
          );
        })}
        {chaptArray}
      </div>
      <div className="logo">
        <h3>Code & Play</h3>
        <button
          onClick={() => {
            requestLeaderBoard(unit);
          }}
          className="leaderboard-btn btn white-btn"
        >
          Leaderboard
        </button>
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
            value={code}
            onChange={onchange}
            mode="typescript"
            theme="monokai"
            name="code"
            fontSize={15}
            height="280px"
            width="560px"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        ) : (
          <DragDrop options={options} />
        )}
        <div className="codebuttons">
          <button
            onClick={() => {
              runCode(code);
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
          <Stopwatch start={start} />
        </div>
      </div>
      <div className="output">
        <p>{output}</p>
      </div>
    </div>
  );
}

export default Game;
