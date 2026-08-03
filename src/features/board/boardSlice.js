import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { addTask, moveTask, updateTask, deleteTask, deleteAllTasks, getTasks } from '../../api/firebase/db'
import { toast } from "sonner" 

const initialState = {
    tasks: {
        byId: {
            '1': {id: '1', title: 'Создать дизайн-макет', desc: 'Разработать главный экран приложения', createdAt: Date.now() - 86400000 * 5, status: 'backlog'},
            '2': {id: '2', title: 'Настроить CI/CD', desc: 'Настроить автоматическую сборку и деплой', createdAt: Date.now() - 86400000 * 4, status: 'backlog'},
            '3': {id: '3', title: 'Оптимизировать запросы к БД', desc: 'Добавить индексы и оптимизировать сложные запросы', createdAt: Date.now() - 86400000 * 4, status: 'backlog'},
            '4': {id: '4', title: 'Разработать API для авторизации', desc: 'JWT + refresh токены', createdAt: Date.now() - 86400000 * 3, status: 'backlog'},
            '5': {id: '5', title: 'Написать unit-тесты для сервиса', desc: 'Покрыть тестами основные бизнес-логику', createdAt: Date.now() - 86400000 * 3, status: 'backlog'},
            '6': {id: '6', title: 'Добавить валидацию форм', desc: 'На клиенте и на сервере', createdAt: Date.now() - 86400000 * 2, status: 'backlog'},
            '7': {id: '7', title: 'Настроить мониторинг', desc: 'Добавить логирование и метрики', createdAt: Date.now() - 86400000 * 2, status: 'backlog'},
            
            '8': {id: '8', title: 'Рефакторинг компонентов', desc: 'Разбить большие компоненты на мелкие', createdAt: Date.now() - 86400000 * 6, status: 'ready'},
            '9': {id: '9', title: 'Обновить зависимости', desc: 'Обновить все пакеты до актуальных версий', createdAt: Date.now() - 86400000 * 5, status: 'ready'},
            '10': {id: '10', title: 'Добавить ESLint', desc: 'Настроить линтер и исправить ошибки', createdAt: Date.now() - 86400000 * 4, status: 'ready'},
            '11': {id: '11', title: 'Написать документацию API', desc: 'Swagger/OpenAPI спецификация', createdAt: Date.now() - 86400000 * 3, status: 'ready'},
            
            '12': {id: '12', title: 'Разработать дашборд', desc: 'Главная страница с аналитикой', createdAt: Date.now() - 86400000 * 7, status: 'in-progress'},
            '13': {id: '13', title: 'Интеграция с платежной системой', desc: 'Подключить Stripe', createdAt: Date.now() - 86400000 * 6, status: 'in-progress'},
            '14': {id: '14', title: 'Добавить уведомления', desc: 'Real-time уведомления через WebSocket', createdAt: Date.now() - 86400000 * 5, status: 'in-progress'},
            '15': {id: '15', title: 'Оптимизировать загрузку изображений', desc: 'Добавить ленивую загрузку и WebP', createdAt: Date.now() - 86400000 * 4, status: 'in-progress'},
            '16': {id: '16', title: 'Написать middleware для логирования', desc: 'Логировать все запросы и ответы', createdAt: Date.now() - 86400000 * 3, status: 'in-progress'},
            '17': {id: '17', title: 'Создать компонент таблицы', desc: 'С сортировкой и фильтрацией', createdAt: Date.now() - 86400000 * 2, status: 'in-progress'},
            
            '18': {id: '18', title: 'Верстка главной страницы', desc: 'Адаптивная верстка по макету', createdAt: Date.now() - 86400000 * 9, status: 'finished'},
            '19': {id: '19', title: 'Настроить роутинг', desc: 'React Router с защищенными маршрутами', createdAt: Date.now() - 86400000 * 8, status: 'finished'},
            '20': {id: '20', title: 'Подключить Redux', desc: 'Настроить store, reducers, actions', createdAt: Date.now() - 86400000 * 8, status: 'finished'},
            '21': {id: '21', title: 'Создать модальные окна', desc: 'Переиспользуемые модалки с порталами', createdAt: Date.now() - 86400000 * 7, status: 'finished'},
            '22': {id: '22', title: 'Настроить Webpack', desc: 'Кастомная сборка с оптимизациями', createdAt: Date.now() - 86400000 * 7, status: 'finished'},
            '23': {id: '23', title: 'Добавить темную тему', desc: 'Переключение светлой и темной темы', createdAt: Date.now() - 86400000 * 6, status: 'finished'},
            '24': {id: '24', title: 'Написать хуки для формы', desc: 'Кастомные хуки валидации', createdAt: Date.now() - 86400000 * 6, status: 'finished'},
            '25': {id: '25', title: 'Создать 404 страницу', desc: 'Ссылка на главную и поиск', createdAt: Date.now() - 86400000 * 5, status: 'finished'},
        }
    },
    columns: {
        'backlog': ['1', '2', '3', '4', '5', '6', '7'],
        'ready': ['8', '9', '10', '11'],
        'in-progress': ['12', '13', '14', '15', '16', '17'],
        'finished': ['18', '19', '20', '21', '22', '23', '24', '25'],
    },
    _loading: false
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
        },
        deleteAllTasksOptimistic: (state) => {
            state._deletedAllTasks = {
                byId: { ...state.tasks.byId },
                columns: {
                    backlog: [...state.columns.backlog],
                    ready: [...state.columns.ready],
                    'in-progress': [...state.columns['in-progress']],
                    finished: [...state.columns.finished],
                }
            }
            
            state.columns = {
                backlog: [],
                ready: [],
                'in-progress': [],
                finished: [],
            }
            
            state.tasks.byId = {} 
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
                toast.error(`Не удалось добавить задачу ${state.tasks.byId[id].title}`)
                
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

                    toast.error(`Не удалось изменить статус задачи "${state.tasks.byId[id].title}"`)
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

                toast.error(`Не удалось применить изменения для задачи "${state.tasks.byId[id].title}"`)
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
                
                toast.error(`Не удалось удалить задачу "${state.tasks.byId[id].title}"`)
                console.dir('Откат удаления задачи:', id)
            })
            .addCase(deleteAllInFirebaseAsync.fulfilled, (state, action) => {
                delete state._deletedAllTasks
                toast.success(`Успешно удалено ${action.payload.deleted} задач`)
                console.dir(`Удалено всего ${action.payload.deleted} задач`)
            })
            .addCase(deleteAllInFirebaseAsync.rejected, (state, action) => {
                const backup = state._deletedAllTasks
                
                if (backup) {
                    state.tasks.byId = backup.byId
                    state.columns = backup.columns
                    delete state._deletedAllTasks
                }
                
                toast.error('Не удалось произвести удаление всех задач')
                console.dir('Откат удаления всех задач')
            })
            .addCase(getTasksFromFirebaseAsync.fulfilled, (state, action) => {
            const tasks = action.payload;
            
            // Очищаем текущие задачи
            state.tasks.byId = {};
            state.columns = {
                backlog: [],
                ready: [],
                'in-progress': [],
                finished: [],
            };
            
            // Добавляем полученные задачи в store
            Object.values(tasks).forEach(task => {
                const taskId = task.id;
                const status = task.status || 'backlog';
                
                // Добавляем в byId
                state.tasks.byId[taskId] = {
                    id: taskId,
                    title: task.title || 'Без названия',
                    desc: task.desc || '',
                    createdAt: task.createdAt || Date.now(),
                    status: status,
                };
                
                // Добавляем ID в соответствующую колонку
                if (state.columns[status]) {
                    state.columns[status].push(taskId);
                }
            });
            
            toast.success(`Загружено ${Object.keys(tasks).length} задач`);
            console.dir(`Успешно загружено задач: ${Object.keys(tasks).length}`);

            state._loading = false
        })
        .addCase(getTasksFromFirebaseAsync.rejected, (state, action) => {
            toast.error('Не удалось загрузить задачи. Проверьте подключение к интернету.');

            console.dir('Ошибка загрузки задач:', action.error);

            state._loading = false
        })
        .addCase(getTasksFromFirebaseAsync.pending, (state, action) => {
            state._loading = true
            
        })
     }
})

export const { addTaskOptimistic,
               moveTaskOptimistic,
               editTaskOptimistic,
               deleteTaskOptimistic,
               deleteAllTasksOptimistic
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

export const deleteAllInFirebaseAsync = createAsyncThunk(
    'board/deleteAllInFirebaseAsync',
    async (_, {rejectWithValue}) => {
        try {
            const result = await deleteAllTasks()
            return result
        }
        catch (error) {
            return rejectWithValue({
                error: error.message
            })
        }
    }
)

export const getTasksFromFirebaseAsync = createAsyncThunk(
    'board/getTasksFromFirebaseAsync',
    async (_, { rejectWithValue }) => {
        try {
            const tasks = await getTasks();
            return tasks;
        } catch (error) {
            console.dir('Не получилось загрузить задачи из фаербазы:', error);
            return rejectWithValue({
                error: error.message || 'Ошибка загрузки задач'
            });
        }
    }
)