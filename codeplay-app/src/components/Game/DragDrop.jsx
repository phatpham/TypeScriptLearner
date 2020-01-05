import React, { useState } from "react";
import "./DragDrop.css";

function DragDrop(prop) {
  const [options, setOptions] = useState([
    {
      name: prop.options.one,
      visible: true
    },
    {
      name: prop.options.two,
      visible: true
    },
    {
      name: prop.options.three,
      visible: true
    },
    {
      name: prop.options.four,
      visible: true
    }
  ]);

  const onDragOver = ev => {
    ev.preventDefault();
  };

  const onDragStart = (ev, name) => {
    ev.dataTransfer.setData("name", name);
  };

  const onDrop = ev => {
    let name = ev.dataTransfer.getData("name");
    document.getElementById("gap").innerText = name;
    let newOptions = options;

    for (var i in newOptions) {
      if (newOptions[i].name == name) {
        newOptions[i].visible = false;
      } else {
        newOptions[i].visible = true;
      }
    }
    console.log(newOptions);
    setOptions(newOptions);
  };

  let visibleOptions = [];

  return (
    <div className="dragdrop">
      <div className="passage">
        let fall:{" "}
        <span
          id="gap"
          className="gap"
          onDragOver={e => onDragOver(e)}
          onDrop={e => onDrop(e)}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>{" "}
        = false;
      </div>
      <div className="options">
        {console.log(visibleOptions)}
        {options.forEach(o => {
          visibleOptions.push(
            o.visible ? (
              <div id={o.name} className="option">
                <p draggable="true" onDragStart={e => onDragStart(e, o.name)}>
                  {o.name}
                </p>
              </div>
            ) : (
              <div className="option"></div>
            )
          );
        })}
        {visibleOptions}
        {/*<div className="option">
                    <p draggable="true" onDragStart={(e) => onDragStart(e,"number")}>number</p>
                </div>
                <div className="option">
                    <p draggable="true" onDragStart={(e) => onDragStart(e,"string")}>string</p>
                </div>
                <div className="option">
                    <p draggable="true" onDragStart={(e) => onDragStart(e,"boolean")}>boolean</p>
                </div>
                <div className="option">
                    <p draggable="true" onDragStart={(e) => onDragStart(e,"void")}>void</p>
            </div> */}
      </div>
    </div>
  );
}

export default DragDrop;
