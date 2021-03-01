import { configureStore } from '@reduxjs/toolkit';
import workerReducer from './slices/workerSlice'

export default configureStore({
    reducer: {
        worker: workerReducer
    }
})
