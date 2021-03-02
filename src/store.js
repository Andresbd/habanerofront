import { configureStore } from '@reduxjs/toolkit';
import workerReducer from './slices/workerSlice'
import cropReducer from './slices/cropSlice';

export default configureStore({
    reducer: {
        worker: workerReducer,
        crops: cropReducer
    }
})
