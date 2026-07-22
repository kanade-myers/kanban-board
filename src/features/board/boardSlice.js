import { createAsyncThunk, createSlice } from '@redux/toolkit'

const initialState = {
    tasks: {
        byId: {
            '1': {id: crypto.randomUUID(), title: 'Задача 1', desc: 'дескрипш', createAt: Date.now(), status: 'backlog'},
            '2': {id: crypto.randomUUID(), title: 'Задача 2', desc: 'дескрипш', createAt: Date.now(), status: 'ready' },
            '3': {id: crypto.randomUUID(), title: 'Задача 3', desc: 'дескрипш', createAt: Date.now(), status: 'in-progress'},
            '4': {id: crypto.randomUUID(), title: 'Задача 4', desc: 'дескрипш', createAt: Date.now(), status: 'finished'},
        }
    },
        columns: {
            'backlog': [1],
            'ready': [2],
            'in-progress': [3],
            'finished': [4],
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addOptimistic: (state, action) => {
            const task = {
                id: action.payload.id,
                title: action.payload.title,
                desc: '',
                createdAt: action.payload.createdAt,
                status: 'backlog',
                _isPending: true
            }

            state.tasks.byId[task.id] = task

            state.tasks.columns[task.status].push(task.id)
        },
        // TODO закончить остальные методы
    //     moveToOptimistic: (state, action) => {
    //         const id = action.payload.id
    //         const initialStatus = state.tasks.byId[id].status
    //         const targetStatus = action.payload.to

    //         state.tasks.columns[initialStatus] = state.tasks.columns[initialStatus].filter((item) => item !== id)
    //         state.tasks.byId[id].status = targetStatus
    //         state.tasks.columns[targetStatus].push(id)
    //     },
    //     editOptimistic: (state, action) => {
    //         const taskId = state.tasks.byId[action.payload.id]
    //         if (!taskId) {
    //             console.warn(`Задача ${taskId} не найдена`)
    //             return
    //         }

    //         if (action.payload.title !== undefined) {
    //             taskId.title = action.payload.title || 'Без названия'
    //         }

    //         if (action.payload.desc !== undefined) {
    //             taskId.desc = action.payload.desc
    //         }
            
    //     },
    //     deleteOptimistic: (state, action) => {
    //         const id = action.payload.id
    //         delete state.tasks.byId[id]
            
    //         Object.keys(state.tasks.columns).forEach(column => {
    //             state.tasks.columns[column] = state.tasks.columns[column]
    //             .filter(item => item !== id)
    // })
    //     }
    },
     extraReducers: builder => {
        builder
        // TODO доделать
     }
})

export const { addTaskOptimistic,
               moveTaskOptimistic,
               editTaskOptimistic,
               deleteTaskOptimistic
            } = boardSlice.actions

export default boardSlice.reducer

// Селекторы для получения задач по колонкам
export const selectBacklogTasks = (state) => {
    const taskIds = state.columns['backlog'] || []
    return taskIds.map(id => state.tasks.byId[id]).filter(Boolean)
}

export const selectReadyTasks = (state) => {
    const taskIds = state.columns['ready'] || []
    return taskIds.map(id => state.tasks.byId[id]).filter(Boolean)
}

export const selectInProgressTasks = (state) => {
    const taskIds = state.columns['in-progress'] || []
    return taskIds.map(id => state.tasks.byId[id]).filter(Boolean)
}

export const selectFinishedTasks = (state) => {
    const taskIds = state.columns['finished'] || []
    return taskIds.map(id => state.tasks.byId[id]).filter(Boolean)
}

export const addToFirebaseAsync = createAsyncThunk(
    'board/addToFirebase',
    async (tempId) => {
        //TODO сделать запрос в фаербазу
    }
)