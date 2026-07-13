import { createAsyncThunk, createSlice } from '@redux/toolkit'

const initialState = {
    tasks: {
        '1': {id: crypto.randomUUID(), title: 'Задача 1', desc: 'дескрипш', createAt: Date.now() },
        '2': {id: crypto.randomUUID(), title: 'Задача 2', desc: 'дескрипш', createAt: Date.now() },
        '3': {id: crypto.randomUUID(), title: 'Задача 3', desc: 'дескрипш', createAt: Date.now() },
        '4': {id: crypto.randomUUID(), title: 'Задача 4', desc: 'дескрипш', createAt: Date.now() },
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
        
    }
})