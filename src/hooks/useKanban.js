import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export default function useKanban() {
    const {tasks, setTasks} = useContext(TasksContext)
    
    const addTask = (columnName, title) => {
    setTasks(prev => ({
        ...prev,
        [columnName]: [
            ...prev[columnName],
            {
                id: crypto.randomUUID(),
                title: title,
                desc: '',
                createdAt: Date.now()
            }
        ]
    }));
}

const deleteTask = (columnName, id) => {
    setTasks(prev => ({
        ...prev,
        [columnName]: prev[columnName].filter(task => task.id !== id)
    }));
}

const editTask = (columnName, id, desc = null, title = null) => {
    setTasks(prev => ({
        ...prev,
        [columnName]: prev[columnName].map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    ...(title !== null && { title }), // используется сокращенная запись
                    ...(desc !== null && { title })   // свойства {title} === {title: title}
                }; 
            }
            return task;
        })
    }));
}

const moveTask = (columnNameFrom, columnNameTo, id) => {
    setTasks(prev => {
        // Находим задачу в исходной колонке
        const taskToMove = prev[columnNameFrom].find(task => task.id === id);
        
        if (!taskToMove) {
            console.warn(`Задача с id ${id} не найдена в колонке ${columnNameFrom}`);
            return prev;
        }

        // Удаляем задачу из исходной колонки
        const updatedFrom = prev[columnNameFrom].filter(task => task.id !== id);
        
        // Добавляем задачу в целевую колонку
        const updatedTo = [...prev[columnNameTo], taskToMove];

        return {
            ...prev,
            [columnNameFrom]: updatedFrom,
            [columnNameTo]: updatedTo
        };
    });
}

    return {addTask, editTask, moveTask, deleteTask}
}