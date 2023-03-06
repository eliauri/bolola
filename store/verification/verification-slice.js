import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    code: '',
    completed: false,
    errorMsg: '',
}

export const verificationSlice = createSlice({
    name: 'verificationSlice',
    initialState: initialState,
    reducers: {
        setCompleted: (state, action) => {
            state.completed = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload
        },
        setVerificationError: (state, action) => {
            state.errorMsg = action.payload
        }
    }
});

export const { setCompleted, setCode, setVerificationError } = verificationSlice.actions;
export default verificationSlice.reducer;