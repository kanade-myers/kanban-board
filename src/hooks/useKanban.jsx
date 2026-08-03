// hooks/useKanban.js
import { useDispatch, useSelector } from "react-redux";
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
    getTasksFromFirebaseAsync,
    selectBacklogTasks,
    selectReadyTasks,
    selectInProgressTasks,
    selectFinishedTasks,
} from "../features/board/boardSlice.js";

import { auth } from "../api/firebase/config.js";

export const useKanban = () => {
    const dispatch = useDispatch();

    // Селекторы для получения задач
    const backlogTasks = useSelector(selectBacklogTasks);
    const readyTasks = useSelector(selectReadyTasks);
    const inProgressTasks = useSelector(selectInProgressTasks);
    const finishedTasks = useSelector(selectFinishedTasks);
    
    // Состояния загрузки и ошибок
    const loading = useSelector(state => state.boards._loading);

    // GET - получение всех задач
    const getTasks = async () => {
        try {
            if (!auth.currentUser) {
                throw new Error('Пользователь не авторизован')
            }
            const result = await dispatch(getTasksFromFirebaseAsync());
            return result;
        } catch (error) {
            console.dir('Ошибка получения задач:', error);
            throw error;
        }
    };

    const addTask = (title) => {
        const tempId = crypto.randomUUID();
        const task = {
            title,
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
        // CRUD операции
        getTasks,
        addTask,
        moveTask,
        editTask,
        deleteTask,
        deleteAllTasks,
        
        // Селекторы для задач
        backlogTasks,
        readyTasks,
        inProgressTasks,
        finishedTasks,
        
        // Состояния
        loading
    };
};