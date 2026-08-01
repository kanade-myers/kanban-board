// hooks/useKanban.js
import { useDispatch } from "react-redux";
import {
    addTaskOptimistic,
    moveTaskOptimistic,
    editTaskOptimistic,
    deleteTaskOptimistic,
    deleteAllTasksOptimistic,
    addToFirebaseAsync,
    moveInFirebaseAsync,
    editInFirebaseAsync,
    deleteInFirebaseAsync,
    deleteAllInFirebaseAsync,
} from "../features/board/boardSlice.js";

export const useKanban = () => {
    const dispatch = useDispatch();

    const addTask = (taskData) => {
        const tempId = crypto.randomUUID();
        const task = {
            ...taskData,
            id: tempId,
            createdAt: Date.now(),
        };

        dispatch(addTaskOptimistic(task));
        dispatch(addToFirebaseAsync(task));
    };

    const moveTask = (id, to) => {
        dispatch(moveTaskOptimistic({ id, to }));
        dispatch(moveInFirebaseAsync({ id, newStatus: to }));
    };

    const editTask = (id, title, desc) => {
        dispatch(editTaskOptimistic({ id, title, desc }));
        dispatch(editInFirebaseAsync({ id, title, desc }));
    };

    const deleteTask = (id) => {
        dispatch(deleteTaskOptimistic(id));
        dispatch(deleteInFirebaseAsync(id));
    };

    const deleteAllTasks = () => {
        dispatch(deleteAllTasksOptimistic());
        dispatch(deleteAllInFirebaseAsync());
    };

    return {
        addTask,
        moveTask,
        editTask,
        deleteTask,
        deleteAllTasks,
    };
};