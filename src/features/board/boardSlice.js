import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTask } from '../../api/firebase/db' 

const initialState = {
    tasks: {
        byId: {
            '1': {id: '1', title: 'Задача 1', desc: 'дескрипш', createdAt: Date.now(), status: 'backlog'},
            '2': {id: '2', title: 'Задача 2', desc: 'дескрипш', createdAt: Date.now(), status: 'ready' },
            '3': {id: '3', title: 'Задача 3', desc: 'дескрипш', createdAt: Date.now(), status: 'in-progress'},
            '4': {id: '4', title: 'Задача 4', desc: 'дескрипш', createdAt: Date.now(), status: 'finished'},
        }
    },
        columns: {
            'backlog': ['1'],
            'ready': ['2'],
            'in-progress': ['3'],
            'finished': ['4'],
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addTaskOptimistic: (state, action) => {
            const task = {
                id: action.payload.id,
                title: action.payload.title,
                desc: '',
                createdAt: action.payload.createdAt,
                status: 'backlog',
                _isPending: true
            }

            state.tasks.byId[task.id] = task

            state.columns[task.status].push(task.id)
        },
        // TODO закончить остальные методы
    //     moveTaskOptimistic: (state, action) => {
    //         const id = action.payload.id
    //         const initialStatus = state.tasks.byId[id].status
    //         const targetStatus = action.payload.to

    //         state.columns[initialStatus] = state.columns[initialStatus].filter((item) => item !== id)
    //         state.tasks.byId[id].status = targetStatus
    //         state.columns[targetStatus].push(id)
    //     },
    //     editTaskOptimistic: (state, action) => {
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
    //     deleteTaskOptimistic: (state, action) => {
    //         const id = action.payload.id
    //         delete state.tasks.byId[id]
            
    //         Object.keys(state.columns).forEach(column => {
    //             state.columns[column] = state.columns[column]
    //             .filter(item => item !== id)
    // })
    //     }
    },
     extraReducers: builder => {
        builder
            .addCase(addToFirebaseAsync.fulfilled, (state, action) => {
                const tempId = action.payload.tempId
                const realId = action.payload.realId

                const task = state.tasks.byId[tempId]
                if (task) {
                    const column = state.columns[task.status]
                    const index = column.indexOf(tempId)
                    if (index !== -1) {
                        column[index] = realId
                    }
                    
                    task.id = realId
                    task._isPending = false
                    
                    state.tasks.byId[realId] = task 
                    delete state.tasks.byId[tempId]
                }
            })
            .addCase(addToFirebaseAsync.rejected, (state, action) => {
                const id = action.payload.id
                const task = state.tasks.byId[id]
                
                if (task) {
                    const column = state.columns[task.status]
                    if (column) {
                        state.columns[task.status] = column.filter(item => item !== id)
                    }
                    delete state.tasks.byId[id]
                }
                
                console.warn('Произошел откат задачи:', id)
            })
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
    const taskIds = state.boards.columns['backlog'] || []
    return taskIds.map(id => state.boards.tasks.byId[id]).filter(Boolean)
}

export const selectReadyTasks = (state) => {
    const taskIds = state.boards.columns['ready'] || []
    return taskIds.map(id => state.boards.tasks.byId[id]).filter(Boolean)
}

export const selectInProgressTasks = (state) => {
    const taskIds = state.boards.columns['in-progress'] || []
    return taskIds.map(id => state.boards.tasks.byId[id]).filter(Boolean)
}

export const selectFinishedTasks = (state) => {
    const taskIds = state.boards.columns['finished'] || []
    return taskIds.map(id => state.boards.tasks.byId[id]).filter(Boolean)
}

export const addToFirebaseAsync = createAsyncThunk(
    'board/addToFirebase',
    async (taskData, {rejectWithValue}) => {
        try {
            const firebaseTaskId = await addTask(taskData)
            return {
                tempId: taskData.id,
                realId: firebaseTaskId
            }
        }
        catch(error) {
            console.dir(`Ошибка добавления задачи в firebase, временное id: ${taskData.id}`)
            return rejectWithValue({
                error: error.message,
                id: taskData.id
            })
        }
    }
)