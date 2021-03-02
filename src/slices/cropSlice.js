import { createSlice } from '@reduxjs/toolkit';

export const cropSlice = createSlice({
    name: 'crops',
    initialState: {
        cropTypes: []
    },
    reducers: {
        setCropTypes: (state, action) => {
            state.cropTypes = action.payload
        }
    }
})

export const { setCropTypes } = cropSlice.actions;
export default cropSlice.reducer
