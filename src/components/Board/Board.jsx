import { useSelector } from "react-redux"
import { useKanban } from "../../hooks/useKanban.jsx"
import { DeleteTaskDialog } from '../DeleteTaskDialog.jsx'
import './Board.scss'
import { Column } from "./Column.jsx"
import { useEffect } from "react"

export default function Board() {

    const {getTasks,
           backlogTasks,
           readyTasks,
           inProgressTasks,
           finishedTasks,
           loading} = useKanban()

    useEffect(() => {
        try {
            getTasks()
        }
        catch(error) {
            console.dir(error)
        }
    }, [])

  return (
    <>
    {loading ? 'Загрузка данных...' : <main className="main-board">
            <div className="main-board__container">
                <Column title="Backlog" tasks={backlogTasks} pushpinColor="black"/>
                <Column title="Ready" tasks={readyTasks} pushpinColor="yellow" isLight={true}/>
                <Column title="In Progress" tasks={inProgressTasks} pushpinColor="black"/>
                <Column title="Finished" tasks={finishedTasks} pushpinColor="yellow" isLight={true}/>
            </div>
        </main>}
    </>
  )
}