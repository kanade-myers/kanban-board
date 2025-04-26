import { Main } from "./components/main/main.jsx";
import { Header } from "./components/header/Header.jsx";
import { Footer } from "./components/footer/footer.jsx";
import "./index.css";
import "./media.css";
import "./fonts-css/fonts.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [tasksBacklog, setTasksBacklog] = useState(
    localStorage.backlog ? JSON.parse(localStorage.backlog) : []
  );
  const [tasksFinished, setTasksFinished] = useState(
    localStorage.finished ? JSON.parse(localStorage.finished) : []
  );
  const [tasksReady, setTasksReady] = useState(
    localStorage.ready ? JSON.parse(localStorage.ready) : []
  );
  const [tasksInProgress, setTasksInProgress] = useState(
    localStorage.inprogress ? JSON.parse(localStorage.inprogress) : []
  );

  useEffect(() => {
    localStorage.backlog = JSON.stringify(tasksBacklog);
  });
  useEffect(() => {
    localStorage.ready = JSON.stringify(tasksReady);
  });
  useEffect(() => {
    localStorage.inprogress = JSON.stringify(tasksInProgress);
  });
  useEffect(() => {
    localStorage.finished = JSON.stringify(tasksFinished);
  });

  // useEffect(() => {
  //     props.setTasksBacklog(JSON.parse(localStorage.backlog))
  //     props.setTasksReady(JSON.parse(localStorage.ready))
  //     props.setTasksInProgress(JSON.parse(localStorage.inprogress))
  //     props.setTasksFinished(JSON.parse(localStorage.finished))
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div className="main-wrap">
                <Header />
                <Main
                  tasksInProgress={tasksInProgress}
                  setTasksInProgress={setTasksInProgress}
                  tasksReady={tasksReady}
                  setTasksReady={setTasksReady}
                  tasksBacklog={tasksBacklog}
                  setTasksBacklog={setTasksBacklog}
                  tasksFinished={tasksFinished}
                  setTasksFinished={setTasksFinished}
                />
                <Footer
                  tasksBacklog={tasksBacklog}
                  tasksFinished={tasksFinished}
                />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
