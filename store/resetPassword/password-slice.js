import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: false,
    responseSuccess: false,
    errMsg: '',
}

export const passwordSlice = createSlice({
    name: 'registationSlice',
    initialState: initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setErrMsg: (state, action) => {
            state.errMsg = action.payload
        },
        setResponse: (state, action) => {
            state.responseSuccess = action.payload
        }
    }
});

export const { setData, setErrMsg, setResponse} = passwordSlice.actions;
export default passwordSlice.reducer;