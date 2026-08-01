import { useSelector } from "react-redux"
import { selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks
 } from '../../features/board/boardSlice.js'
import { useKanban } from "../../hooks/useKanban.jsx"
import { DeleteTaskDialog } from '../DeleteTaskDialog.jsx'
import Header from "../Header/Header.jsx"

export default function Board() {

    const [addTask, moveTask, editTask, deleteTask, deleteAllTasks,] = useKanban()

    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

  return (
    <>
        <Header />
    </>
    
  )
}