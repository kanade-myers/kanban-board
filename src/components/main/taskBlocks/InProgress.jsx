import "../main.css";
import { AddCardInProgress } from "./AddCard/AddCardInProgress.jsx";
import { Link } from "react-router-dom";

export const InProgress = (props) => {
  return (
    <>
      <div className="main-inProgress">
        InProgress
        {props.tasks.map((task) => (
          <Link to="/desc">
            <div className="main-task">{task[0]}</div>
          </Link>
        ))}
        <AddCardInProgress
          tasks={props.tasks}
          setTasks={props.setTasks}
          tasksReady={props.tasksReady}
          setTasksReady={props.setTasksReady}
        />
      </div>
    </>
  );
};
