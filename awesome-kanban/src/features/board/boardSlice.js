import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { addTask, moveTask, updateTask, deleteTask } from '../../api/firebase/db' 

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
        moveTaskOptimistic: (state, action) => {
            const id = action.payload.id
            const initialStatus = state.tasks.byId[id].status
            const targetStatus = action.payload.to
            const task = state.tasks.byId[id]

            if (!task) {
                console.dir(`Задача с id ${id} не найдена`)
                return
            }
            state.columns[initialStatus] = state.columns[initialStatus].filter((item) => item !== id)

            state.tasks.byId[id]._prevStatus = initialStatus
            state.tasks.byId[id]._isPending = true
            state.tasks.byId[id].status = targetStatus
            state.columns[targetStatus].push(id)
        },
        editTaskOptimistic: (state, action) => {
            const task = state.tasks.byId[action.payload.id]
            const id = action.payload.id
            if (!task) {
                console.warn(`Задача ${id} не найдена`)
                return
            }

            if (action.payload.title !== undefined) {
                task._prevTitle = task.title
                task.title = action.payload.title || 'Без названия'
            }

            if (action.payload.desc !== undefined) {
                task._prevDesc = task.desc
                task.desc = action.payload.desc
            }
            
            task._isPending = true
        },
        deleteTaskOptimistic: (state, action) => {
            const id = action.payload
            const task = state.tasks.byId[id]
            
            if (!task) {
                console.warn(`Задача ${id} не найдена`)
                return
            }
            
            // Сохраняем задачу для отката
            state._deletedTask = { ...task }
            
            // Удаляем из колонки
            state.columns[task.status] = state.columns[task.status].filter(item => item !== id)
            
            // Удаляем задачу
            delete state.tasks.byId[id]  
        }
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
                    delete task._isPending
                    
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
                
                console.dir('Произошел откат задачи:', id)
            })
            
            .addCase(moveInFirebaseAsync.fulfilled, (state, action) => {
                const id = action.payload.id
                delete state.tasks.byId[id]._prevStatus
                delete state.tasks.byId[id]._isPending
            })
            .addCase(moveInFirebaseAsync.rejected, (state, action) => {
                const id = action.payload.id
                const prevStatus = state.tasks.byId[id]._prevStatus
                const currentStatus = action.payload.newStatus

                    state.columns[currentStatus] = state.columns[currentStatus].filter((item) => item !== id)

                    delete state.tasks.byId[id]._prevStatus
                    delete state.tasks.byId[id]._isPending
                    state.tasks.byId[id].status = prevStatus

                    state.columns[prevStatus].push(id)
            })
            .addCase(editInFirebaseAsync.fulfilled, (state, action) => {
                const id = action.payload.id
                const task = state.tasks.byId[id]
                if (task) {
                    delete task._prevTitle
                    delete task._prevDesc
                    delete task._isPending
                }
            })
            .addCase(editInFirebaseAsync.rejected, (state, action) => {
                const id = action.payload.id
                const task = state.tasks.byId[id]
                
                if (!task) {
                    console.dir(`Задача с id ${id} не найдена`)
                    return
                }

                if (task._prevTitle !== undefined) {
                    task.title = task._prevTitle
                }
                if (task._prevDesc !== undefined) {
                    task.desc = task._prevDesc
                }

                delete task._prevTitle
                delete task._prevDesc
                delete task._isPending
            })
            .addCase(deleteInFirebaseAsync.fulfilled, (state, action) => {
                const id = action.payload.id
                delete state._deletedTask
            })
            .addCase(deleteInFirebaseAsync.rejected, (state, action) => {
                const id = action.payload.id
                const task = state._deletedTask
                
                if (task) {
                    // Восстанавливаем задачу
                    state.tasks.byId[id] = task
                    state.columns[task.status].push(id)
                    delete state._deletedTask
                }
                
                console.warn('Откат удаления задачи:', id)
            })
     }
})

export const { addTaskOptimistic,
               moveTaskOptimistic,
               editTaskOptimistic,
               deleteTaskOptimistic
            } = boardSlice.actions

export default boardSlice.reducer

// Селекторы
const selectColumns = (state) => state.boards.columns;
const selectTasksById = (state) => state.boards.tasks.byId;

// Вспомогательная функция для создания селектора колонки
const createColumnSelector = (columnName) => {
  return createSelector(
    [selectColumns, selectTasksById],
    (columns, tasksById) => {
      const taskIds = columns[columnName] || [];
      return taskIds.map(id => tasksById[id]).filter(Boolean);
    }
  );
};

// Экспортируем отдельные селекторы
export const selectBacklogTasks = createColumnSelector('backlog');
export const selectReadyTasks = createColumnSelector('ready');
export const selectInProgressTasks = createColumnSelector('in-progress');
export const selectFinishedTasks = createColumnSelector('finished');

// Асинхронные thunk's для работы с задачами
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

export const moveInFirebaseAsync = createAsyncThunk(
    'board/moveInFirebaseAsync',
    async ({id, newStatus}, {rejectWithValue}) => {
        try {
            const updatedTask = await moveTask(id, newStatus)
            return updatedTask
        }
        catch (error) {
            console.dir(`Ошибка перемещения задачи с id ${id}`)
            return rejectWithValue({
                id: id,
                newStatus: newStatus,
                error: error.message
            })
        }
    }
)

export const editInFirebaseAsync = createAsyncThunk(
    'board/editInFirebaseAsync',
    async ({id, title, desc}, {rejectWithValue}) => {
        try {
            const updatedTaskData = await updateTask(id, title, desc)
            return {...updatedTaskData, id: id}
        }
        catch (error) {
            console.dir(`Не удалось внести изменения в задачу с id ${id}`)
            return rejectWithValue({
                id: id
            })
        }
    }
)

export const deleteInFirebaseAsync = createAsyncThunk(
    'board/deleteInFirebaseAsync',
    async (id, { rejectWithValue }) => {
        try {
            const result = await deleteTask(id)
            return result  // { id, deleted: true }
        } catch (error) {
            console.dir(`Ошибка удаления задачи с id ${id}`)
            return rejectWithValue({
                id: id,
                error: error.message
            })
        }
    }
)