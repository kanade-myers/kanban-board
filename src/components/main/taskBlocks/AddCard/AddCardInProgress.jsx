import "../../main.css";
import React, { useRef } from "react";

export const AddCardInProgress = (props) => {
  const AddinputElement = useRef(null);
  const AddCardElement = useRef(null);
  const inputElement = useRef(null);

  function addTask() {
    if (props.tasksReady.length !== 0) {
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
    for (let i = 0; i !== props.tasksReady.length; i++) {
      inputElement.current.innerHTML += `<div>${props.tasksReady[i][0]}</div>`;
    }
  }

  function selectTask(event) {
    props.tasksReady.forEach((e) => {
      if (e[0] === event.target.textContent) {
        props.setTasks((prevTask) => [...prevTask, e]);
        props.setTasksReady((prevTask) =>
          prevTask.filter((_, index) => index !== props.tasksReady.indexOf(e))
        );
      }
    });

    AddCardElement.current.style.display = "flex";

    AddinputElement.current.style.display = "none";
  }

  window.addEventListener("click", function (event) {
    const listElement = this.document.querySelector(
      'div[class="main-InProgress-input"]'
    );
    const addCardButton = this.document.querySelector(
      'button[class="main-InProgressAddCard"]'
    );

    if (event.target === listElement || event.target === addCardButton) {
    } else {
      const AddinputElement = document.getElementsByClassName(
        "main-InProgress-input"
      )[0];
      AddinputElement.style.display = "none";

      document.getElementsByClassName(
        "main-InProgressAddCard"
      )[0].style.display = "flex";
    }
  });

  return (
    <>
      <div
        ref={AddinputElement}
        onClick={openTaskList}
        className="main-InProgress-input"
      >
        <img src="open-list-arrow.svg" alt="Открыть список" />
        <div
          ref={inputElement}
          onClick={selectTask}
          className="main-InProgress-inputList"
        ></div>
      </div>

      <button
        ref={AddCardElement}
        onClick={addTask}
        className="main-InProgressAddCard"
      >
        <img src="add-task.svg" alt="Добавить" /> Add Card
      </button>
    </>
  );
};
