import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from '../features/boards/boardSlice'

export const store = configureStore({
    reducer: {
        boards: boardSlice
    }
})