import { useDispatch, useSelector } from 'react-redux'

import { addTaskOptimistic,
         moveTaskOptimistic,
         editTaskOptimistic,
         deleteTaskOptimistic,
         addToFirebaseAsync,
         moveInFirebaseAsync,
         editInFirebaseAsync,
         deleteInFirebaseAsync,
         selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks} from '../features/board/boardSlice.js'

import { useDispatch, useSelector } from "react-redux"

export default function Board() {
    const dispatch = useDispatch()
    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

    const handleAddTask = (taskData) => {
        const tempId = crypto.randomUUID()
        const task = {
            ...taskData,
            id: tempId,
            createdAt: Date.now()
        }

        dispatch(addTaskOptimistic(task))
        dispatch(addToFirebaseAsync(task))
    }

    const handleMoveTask = (id, to) => {
        dispatch(moveTaskOptimistic({id, to}))
        dispatch(moveInFirebaseAsync({id, to}))
    }

    const handleEditTask = (id, title, desc) => {
        dispatch(editTaskOptimistic({id, title, desc}))
        dispatch(editInFirebaseAsync({id, title, desc}))
    }

    const handleDelete = (task) => {
        dispatch(deleteTaskOptimistic(task.id))
        dispatch(deleteInFirebaseAsync(task.id))
    }

    return(
        <>
            
        </>
    )
}