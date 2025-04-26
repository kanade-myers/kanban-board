import "./footer.css";

export const Footer = (props) => {
  return (
    <>
      <div className="footer">
        <div className="footer-tasks">
          <div className="footer-tasks--active">
            Active tasks: {props.tasksBacklog.length}
          </div>
          <div className="footer-tasks--finished">
            Finished tasks: {props.tasksFinished.length}
          </div>
        </div>
        <div className="footer-name">
          Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;
        </div>
      </div>
    </>
  );
};
