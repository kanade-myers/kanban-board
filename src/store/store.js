import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from '../features/board/boardSlice'

export const store = configureStore({
    reducer: {
        boards: boardSlice
    }
})