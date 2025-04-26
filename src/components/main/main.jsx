import "./main.css";
import { Backlog } from "./taskBlocks/Backlog.jsx";
import { Ready } from "./taskBlocks/Ready.jsx";
import { InProgress } from "./taskBlocks/InProgress.jsx";
import { Finished } from "./taskBlocks/Finished.jsx";
import { OpenDescription } from "./taskBlocks/OpenDeskcription.jsx";

export const Main = (props) => {
  return (
    <>
      <div className="main">
        <Backlog tasks={props.tasksBacklog} setTasks={props.setTasksBacklog} />
        <Ready
          tasks={props.tasksReady}
          setTasks={props.setTasksReady}
          tasksBacklog={props.tasksBacklog}
          setTasksBacklog={props.setTasksBacklog}
        />
        <InProgress
          tasks={props.tasksInProgress}
          setTasks={props.setTasksInProgress}
          tasksReady={props.tasksReady}
          setTasksReady={props.setTasksReady}
        />
        <Finished
          tasks={props.tasksFinished}
          setTasks={props.setTasksFinished}
          tasksInProgress={props.tasksInProgress}
          setTasksInProgress={props.setTasksInProgress}
        />
        <OpenDescription
          tasksBacklog={props.tasksBacklog}
          tasksFinished={props.tasksFinished}
          tasksReady={props.tasksReady}
          tasksInProgress={props.tasksInProgress}
          setTasksBacklog={props.setTasksBacklog}
          setTasksFinished={props.setTasksFinished}
          setTasksReady={props.setTasksReady}
          setTasksInProgress={props.setTasksInProgress}
        />
      </div>
    </>
  );
};
