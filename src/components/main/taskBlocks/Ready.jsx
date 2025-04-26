import "../main.css";
import { AddCardReady } from "./AddCard/AddCardReady.jsx";
import { Link } from "react-router-dom";

export const Ready = (props) => {
  return (
    <>
      <div className="main-ready">
        Ready
        {props.tasks.map((task) => (
          <Link to="/desc">
            <div className="main-task">{task[0]}</div>
          </Link>
        ))}
        <AddCardReady
          tasks={props.tasks}
          setTasks={props.setTasks}
          tasksBacklog={props.tasksBacklog}
          setTasksBacklog={props.setTasksBacklog}
        />
      </div>
    </>
  );
};
