import { createSlice } from "@reduxjs/toolkit"
import { getCookie } from 'cookies-next';

 
const token = getCookie('token'); // => 'value'
console.log(token)
const authSlice = createSlice({
    name: 'auth',
    initialState:{refresh: null, token: token, user: null},
    reducers: {
        setCredetianals: (state, action) => {
            const {access, refresh} = action.payload;
            state.refresh = refresh;
            state.token = access;
        },
        logOut: (state, action) => {
            state.refresh = null;
            state.token = null;
            state.user = null;
        },
        setUser: (state, action) => {
            const {user} = action.payload;
            state.user = user;
        }
    }
})

export const { setCredetianals, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token;