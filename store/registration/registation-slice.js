import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: false,
    errMsg: '',
}

export const registationSlice = createSlice({
    name: 'registationSlice',
    initialState: initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setErrMsg: (state, action) => {
            state.errMsg = action.payload
        }
    }
});

export const { setData, setErrMsg } = registationSlice.actions;
export default registationSlice.reducer;