import { createSlice } from '@reduxjs/toolkit';

export const workerSlice = createSlice({
    name: 'workers',
    initialState: {
        workerTypes: []
    },
    reducers: {
        setWorkerTypes: (state, action) => {
            state.workerTypes = action.payload
        }
    }
})

export const { setWorkerTypes } = workerSlice.actions;

export default workerSlice.reducer
