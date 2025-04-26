import "../../main.css";
import React, { useRef } from "react";

export const AddCardReady = (props) => {
  const AddinputElement = useRef(null);
  const AddCardElement = useRef(null);
  const inputElement = useRef(null);

  function addTask() {
    if (props.tasksBacklog.length !== 0) {
      AddinputElement.current.style.display = "flex";

      AddCardElement.current.style.display = "none";
    }
  }

  let listOpenIs = 0;

  function openTaskList() {
    listOpenIs = !listOpenIs;

    inputElement.current.style.display = "block";

    if (listOpenIs) inputElement.current.style.display = "block";
    else inputElement.current.style.display = "none";

    inputElement.current.innerHTML = null;
    for (let i = 0; i !== props.tasksBacklog.length; i++) {
      inputElement.current.innerHTML += `<div>${props.tasksBacklog[i][0]}</div>`;
    }
  }

  function selectTask(event) {
    props.tasksBacklog.forEach((e) => {
      if (e[0] === event.target.textContent) {
        props.setTasks((prevTask) => [...prevTask, e]);
        props.setTasksBacklog((prevTask) =>
          prevTask.filter((_, index) => index !== props.tasksBacklog.indexOf(e))
        );
      }
    });

    AddCardElement.current.style.display = "flex";

    AddinputElement.current.style.display = "none";
  }

  window.addEventListener("click", function (event) {
    const listElement = this.document.querySelector(
      'div[class="main-ready-input"]'
    );
    const addCardButton = this.document.querySelector(
      'button[class="main-ReadyAddCard"]'
    );

    if (event.target === listElement || event.target === addCardButton) {
    } else {
      const AddinputElement =
        document.getElementsByClassName("main-ready-input")[0];
      AddinputElement.style.display = "none";

      document.getElementsByClassName("main-ReadyAddCard")[0].style.display =
        "flex";
    }
  });

  return (
    <>
      <div
        ref={AddinputElement}
        onClick={openTaskList}
        className="main-ready-input"
      >
        <img src="open-list-arrow.svg" alt="Открыть список" />
        <div
          ref={inputElement}
          onClick={selectTask}
          className="main-ready-inputList"
        ></div>
      </div>

      <button
        ref={AddCardElement}
        onClick={addTask}
        className="main-ReadyAddCard"
      >
        <img src="add-task.svg" alt="Добавить" /> Add Card
      </button>
    </>
  );
};
