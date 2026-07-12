import { createContext, useContext, useState, useEffect } from "react";

export const TasksContext = createContext(null)

const STORAGE_TASKS_KEY = 'awesome-kanban--tasks'

function getInitialTasks() {
    const DEFAULT_TASKS = {
        backlog: [{id: crypto.randomUUID(),
                   title: 'Сделать кофе',
                   desc: 'лучше всего варить в турке',
                   createdAt: Date.now()
                }],
        ready: [],
        inProgress: [],
        finished: [],
    }

    try {
        const saved = localStorage.getItem(STORAGE_TASKS_KEY)
        if (saved) {
            return JSON.parse(saved)
        }
    }
    catch (error) {
        throw new Error('Ошибка загрузки задач из localStorage', error)
    }

    return DEFAULT_TASKS
}

export function TasksProvider({children}) {
    const [tasks, setTasks] = useState(getInitialTasks)
    
    useEffect(() => {
        localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(tasks))
    }, [tasks])

    return(
        <>
            <TasksContext.Provider value={{tasks, setTasks}}>
                {children}
            </TasksContext.Provider>
        </>
    )
}

export function useTasksContext() {
    const context = useContext(TasksContext)
    if(!context) {
        throw new Error('useTasksContext необходимо использовать в пределах TasksProvider')
    }
    return context
}