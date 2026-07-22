import { useDispatch, useSelector } from 'react-redux'

import { addTaskOptimistic,
         moveTaskOptimistic,
         editTaskOptimistic,
         deleteTaskOptimistic,
         addToFirebaseAsync,
         selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks } from '../features/board/boardSlice.js'

import { useDispatch, useSelector } from "react-redux"

export default function Board() {
    const dispatch = useDispatch()
    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

    function handleAddTask(taskData) {
        const tempId = crypto.randomUUID()
        const task = {
            ...taskData,
            id: tempId,
            createdAt: Date.now()
        }

        dispatch(addTaskOptimistic(task))
        dispatch(addToFirebaseAsync(task))
    }


    return(
        <>
            
        </>
    )
}