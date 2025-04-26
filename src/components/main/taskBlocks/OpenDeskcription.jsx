import "../main.css";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const OpenDescription = (props) => {
  const descRef = useRef(null);
  const descNameRef = useRef(null);
  const descTextRef = useRef(null);
  const descTextareaRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", function (event) {
      if (event.target.className === "main-task") {
        props.tasksBacklog.forEach((element) => {
          if (element[0] === event.target.textContent) {
            descNameRef.current.innerHTML = element[0];
            descRef.current.style.display = "block";
            if (element[1] === "") {
              descTextareaRef.current.value = "This task has no description";
            } else {
              descTextareaRef.current.value = element[1];
            }
          }
        });

        props.tasksReady.forEach((element) => {
          if (element[0] === event.target.textContent) {
            descNameRef.current.innerHTML = element[0];
            descRef.current.style.display = "block";
            if (element[1] === "") {
              descTextareaRef.current.value = "This task has no description";
            } else {
              descTextareaRef.current.value = element[1];
            }
          }
        });

        props.tasksInProgress.forEach((element) => {
          if (element[0] === event.target.textContent) {
            descNameRef.current.innerHTML = element[0];
            descRef.current.style.display = "block";
            if (element[1] === "") {
              descTextareaRef.current.value = "This task has no description";
            } else {
              descTextareaRef.current.value = element[1];
            }
          }
        });

        props.tasksFinished.forEach((element) => {
          if (element[0] === event.target.textContent) {
            descNameRef.current.innerHTML = element[0];
            descRef.current.style.display = "block";
            if (element[1] === "") {
              descTextareaRef.current.value = "This task has no description";
            } else {
              descTextareaRef.current.value = element[1];
            }
          }
        });
      }
    });
  });
  function closeDescription() {
    descRef.current.style.display = "none";
  }

  function changeDesc(event) {
    props.tasksBacklog.forEach((element, index) => {
      if (element[0] === descNameRef.current.innerHTML) {
        const newTasks = props.tasksBacklog;

        newTasks[index][1] = descTextareaRef.current.value;
        props.setTasksBacklog(newTasks);
      }
    });
    props.tasksReady.forEach((element, index) => {
      if (element[0] === descNameRef.current.innerHTML) {
        const newTasks = props.tasksReady;

        newTasks[index][1] = descTextareaRef.current.value;
        props.setTasksReady(newTasks);
      }
    });
    props.tasksInProgress.forEach((element, index) => {
      if (element[0] === descNameRef.current.innerHTML) {
        const newTasks = props.tasksInProgress;

        newTasks[index][1] = descTextareaRef.current.value;
        props.setTasksInProgress(newTasks);
      }
    });
    props.tasksFinished.forEach((element, index) => {
      if (element[0] === descNameRef.current.innerHTML) {
        const newTasks = props.tasksFinished;

        newTasks[index][1] = descTextareaRef.current.value;
        props.setTasksFinished(newTasks);
      }
    });
  }

  return (
    <>
      <div className="main-description" ref={descRef}>
        <div className="main-description-header">
          <div name="openDescName" ref={descNameRef}></div>
          <Link to="/">
            <img
              onClick={closeDescription}
              src="close-desc.svg"
              alt="Закрыть"
            />
          </Link>
        </div>
        <div className="main-description-text" ref={descTextRef}>
          <textarea
            onChange={changeDesc}
            ref={descTextareaRef}
            autoFocus
            maxLength="1148"
            className="main-description-textArea"
          ></textarea>
        </div>
      </div>
    </>
  );
};
