import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

const initialState = getCookie('refreshToken') ? {
  isLoggedIn: true,
} : {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    deAuthenticate: (state) => {
      state.isLoggedIn = false;
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});

export const { deAuthenticate, authenticate } = authSlice.actions;

export default authSlice.reducer;