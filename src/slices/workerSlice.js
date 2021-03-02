import { createSlice } from '@reduxjs/toolkit';

export const workerSlice = createSlice({
    name: 'workers',
    initialState: {
        workerTypes: [],
        workersHired: [],
    },
    reducers: {
        setWorkerTypes: (state, action) => {
            state.workerTypes = action.payload
        },
        setWorkersHired: (state, action) => {
            state.workersHired = action.payload
        }
    }
})

export const { setWorkerTypes, setWorkersHired } = workerSlice.actions;

export default workerSlice.reducer
