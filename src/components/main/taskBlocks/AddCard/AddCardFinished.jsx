import "../../main.css";
import React, { useRef } from "react";

export const AddCardFinished = (props) => {
  const AddinputElement = useRef(null);
  const FinishedAddCardElement = useRef(null);
  const inputListElement = useRef(null);

  function addTask() {
    if (props.tasksInProgress.length !== 0) {
      AddinputElement.current.style.display = "flex";
      FinishedAddCardElement.current.style.display = "none";
    }
  }

  let listOpenIs = 0;

  function openTaskList() {
    listOpenIs = !listOpenIs;

    inputListElement.current.style.display = "block";

    if (listOpenIs) inputListElement.current.style.display = "block";
    else inputListElement.current.style.display = "none";

    inputListElement.current.innerHTML = null;
    for (let i = 0; i !== props.tasksInProgress.length; i++) {
      inputListElement.current.innerHTML += `<div>${props.tasksInProgress[i][0]}</div>`;
    }
  }

  function selectTask(event) {
    props.tasksInProgress.forEach((e) => {
      if (e[0] === event.target.textContent) {
        props.setTasks((prevTask) => [...prevTask, e]);
        props.setTasksInProgress((prevTask) =>
          prevTask.filter(
            (_, index) => index !== props.tasksInProgress.indexOf(e)
          )
        );
      }
    });

    FinishedAddCardElement.current.style.display = "flex";
    AddinputElement.current.style.display = "none";
  }

  window.addEventListener("click", function (event) {
    const AddinputElement = document.querySelector(
      'div[class="main-Finished-input"]'
    );
    const FinishedAddCardElement = document.querySelector(
      'button[class="main-FinishedAddCard"]'
    );

    if (
      event.target === AddinputElement ||
      event.target === FinishedAddCardElement
    ) {
    } else {
      AddinputElement.style.display = "none";

      FinishedAddCardElement.style.display = "flex";
    }
  });

  return (
    <>
      <div
        ref={AddinputElement}
        onClick={openTaskList}
        className="main-Finished-input"
      >
        <img src="open-list-arrow.svg" alt="Открыть список" />
        <div
          ref={inputListElement}
          onClick={selectTask}
          className="main-Finished-inputList"
        ></div>
      </div>

      <button
        ref={FinishedAddCardElement}
        onClick={addTask}
        className="main-FinishedAddCard"
      >
        <img src="add-task.svg" alt="Добавить" /> Add Card
      </button>
    </>
  );
};
