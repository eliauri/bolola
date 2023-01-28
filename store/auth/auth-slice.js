import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

const initialState = getCookie('accessToken') ? {
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
      // state.user = action.payload;
    },
  },
});

export const { deAuthenticate, authenticate } =
  authSlice.actions;

export default authSlice.reducer;