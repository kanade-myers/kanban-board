import "../main.css";
import { AddCardBacklog } from "./AddCard/AddCardBacklog.jsx";
import { Link } from "react-router-dom";

export const Backlog = (props) => {
  return (
    <>
      <div className="main-backlog">
        Backlog
        {props.tasks.map((task) => (
          <Link to={task[0]}>
            <div className="main-task">{task[0]}</div>
          </Link>
        ))}
        <AddCardBacklog tasks={props.tasks} setTasks={props.setTasks} />
      </div>
    </>
  );
};
