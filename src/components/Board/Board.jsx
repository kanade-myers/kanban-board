import { useSelector } from "react-redux"
import { selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks
 } from '../../features/board/boardSlice.js'
import { useKanban } from "../../hooks/useKanban.jsx"
import { DeleteTaskDialog } from '../DeleteTaskDialog.jsx'
import './Board.scss'
import { Column } from "./Column.jsx"

export default function Board() {

    const [addTask, moveTask, editTask, deleteTask, deleteAllTasks,] = useKanban()

    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

  return (
      <main className="main-board">
            <div className="main-board__container">
                <Column title="Backlog" tasks={backlog} pushpinColor="black"/>
                <Column title="Ready" tasks={ready} pushpinColor="yellow" isLight={true}/>
                <Column title="In Progress" tasks={inProgress} pushpinColor="black"/>
                <Column title="Finished" tasks={finished} pushpinColor="yellow" isLight={true}/>
            </div>
        </main>  
  )
}