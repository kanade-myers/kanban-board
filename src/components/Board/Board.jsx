import { useSelector } from "react-redux"
import { selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks
 } from '../../features/board/boardSlice.js'
import { useKanban } from "../../hooks/useKanban.jsx"
import { DeleteTaskDialog } from '../DeleteTaskDialog.jsx'
import './Board.scss'

export default function Board() {

    const [addTask, moveTask, editTask, deleteTask, deleteAllTasks,] = useKanban()

    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

  return (
      <main className="main">
          <div className="main-container">

          {/* // Backlog column */}
              <article className="main-container__column-container">
                    <div className="main-container__column-container__wrapp">
                        <div className="main-container__column-container__pushpin">
                            <img src="images/pushpin-black.svg" alt='Чёрная канцелярская кнопка' />
                        </div>
                        <div className="main-container__column-container__column-name">
                            Backlog
                        </div>
                        <div className="main-container__column-container__line" />
                    </div>
                    <div className="main-container__column-container__tasks-container">
                        {backlog.map((item) => <div key={item.id}>{item.title}</div>)}
                    </div>
                    <div className="main-container__column-container__add-task-button">
                        <button>+ Add card</button>
                    </div>
              </article>

            {/* // Ready column */}
              <article className="main-container__column-container">
                    <div className="main-container__column-container__wrapp">
                        <div className="main-container__column-container__pushpin">
                            <img src="images/pushpin-yellow.svg" alt='Чёрная канцелярская кнопка' />
                        </div>
                        <div className="main-container__column-container__column-name">
                            Ready
                        </div>
                        <div className="main-container__column-container__line" />
                    </div>
                    <div className="main-container__column-container__tasks-container">
                        {ready.map((item) => <div key={item.id}>{item.title}</div>)}
                    </div>
                    <div className="main-container__column-container__add-task-button">
                        <button>+ Add card</button>
                    </div>
              </article>

            {/* // In Progress column */}
              <article className="main-container__column-container">
                    <div className="main-container__column-container__wrapp">
                        <div className="main-container__column-container__pushpin">
                            <img src="images/pushpin-black.svg" alt='Чёрная канцелярская кнопка' />
                        </div>
                        <div className="main-container__column-container__column-name">
                            In Progress
                        </div>
                        <div className="main-container__column-container__line" />
                    </div>
                    <div className="main-container__column-container__tasks-container">
                        {inProgress.map((item) => <div key={item.id}>{item.title}</div>)}
                    </div>
                    <div className="main-container__column-container__add-task-button">
                        <button>+ Add card</button>
                    </div>
              </article>

            {/* // Finished column */}
              <article className="main-container__column-container">
                    <div className="main-container__column-container__wrapp">
                        <div className="main-container__column-container__pushpin">
                            <img src="images/pushpin-yellow.svg" alt='Чёрная канцелярская кнопка' />
                        </div>
                        <div className="main-container__column-container__column-name">
                            Finished
                        </div>
                        <div className="main-container__column-container__line" />
                    </div>
                    <div className="main-container__column-container__tasks-container">
                        {finished.map((item) => <div key={item.id}>{item.title}</div>)}
                    </div>
                    <div className="main-container__column-container__add-task-button">
                        <button>+ Add card</button>
                    </div>
              </article>
          </div>
      </main>  
  )
}