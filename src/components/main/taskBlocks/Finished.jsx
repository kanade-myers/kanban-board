import "../main.css";
import { AddCardFinished } from "./AddCard/AddCardFinished.jsx";
import { Link } from "react-router-dom";

export const Finished = (props) => {
  return (
    <>
      <div className="main-finished">
        Finished
        {props.tasks.map((task) => (
          <Link to="/desc">
            <div className="main-task">{task[0]}</div>
          </Link>
        ))}
        <AddCardFinished
          tasks={props.tasks}
          setTasks={props.setTasks}
          tasksInProgress={props.tasksInProgress}
          setTasksInProgress={props.setTasksInProgress}
        />
      </div>
    </>
  );
};
