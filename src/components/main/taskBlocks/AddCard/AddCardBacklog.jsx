import React, { useState, useRef } from "react";
import "../../main.css";

export const AddCardBacklog = (props) => {
  const inputElement = useRef(null);
  const AddCardElement = useRef(null);
  const submitButtonElement = useRef(null);
  const addCardInputElement = useRef(null);

  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function addTask() {
    console.log(inputElement);
    inputElement.current.style.display = "block";
    AddCardElement.current.style.display = "none";
    submitButtonElement.current.style.display = "block";

    const input = document.querySelector('input[name="s"]');
    setTimeout((_) => input.focus(), 0);
  }

  function submitTask() {
    if (value === null) {
    } // Проверка не пустое ли поле с задаваемой задачей
    else {
      let checkSameTaskName = false; // Проверяет нет ли активной задачи с таким же именем

      props.tasks.forEach((element) => {
        if (value === element[0]) {
          checkSameTaskName = true;
        }
      });
      if (checkSameTaskName === false) {
        props.setTasks((prevTasks) => [...prevTasks, [value, ""]]);
      }
    }

    addCardInputElement.current.value = "";
    setValue("");
  }

  window.addEventListener("click", function (event) {
    const inputElement = document.querySelector(
      'div[class="main-backlog-input"]'
    );
    const AddCardElement = document.querySelector(
      'button[class="main-BacklogAddCard"]'
    );
    const submitButtonElement = document.querySelector(
      'button[class="main-BacklogSubmit"]'
    );
    const addCardInputElement = document.querySelector(
      'input[class="main-addCard-input"]'
    );

    if (addCardInputElement.value !== "") {
    } else {
      if (
        event.target === inputElement ||
        event.target === AddCardElement ||
        event.target === addCardInputElement
      ) {
      } else {
        inputElement.style.display = "none";
        AddCardElement.style.display = "flex";
        submitButtonElement.style.display = "none";
      }
    }
  });

  return (
    <>
      <div ref={inputElement} className="main-backlog-input">
        <input
          ref={addCardInputElement}
          onChange={handleChange}
          value={value}
          type="text"
          className="main-addCard-input"
          name="s"
        />
      </div>

      <button
        ref={AddCardElement}
        onClick={addTask}
        className="main-BacklogAddCard"
      >
        <img src="add-task.svg" alt="Добавить" /> Add Card
      </button>
      <button
        ref={submitButtonElement}
        onClick={submitTask}
        className="main-BacklogSubmit"
      >
        Submit
      </button>
    </>
  );
};
