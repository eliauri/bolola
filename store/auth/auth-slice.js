import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../pages/api/axios';

const ISSERVER = typeof window === "undefined";

const initialState = !ISSERVER && localStorage.getItem('refreshToken') ? {
  isLoggedIn: true,
} : {
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async function (data, thunkAPI) {
    try {
      const response = await axios.post('/user/login/', JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      localStorage.setItem('accessToken', response?.data.access);
      localStorage.setItem('refreshToken', response?.data.refresh);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err)
      if (!err?.response.status) {
        return thunkAPI.rejectWithValue('Нет ответа от сервера');
      } else if (err?.response.status === 401) {
        return thunkAPI.rejectWithValue(err.response.data.detail);
      } else {
        return thunkAPI.rejectWithValue('Ошибка авторизации');
      }
    }
  }
);

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
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    })
  }
});

export const { deAuthenticate, authenticate } = authSlice.actions;

export default authSlice.reducer;