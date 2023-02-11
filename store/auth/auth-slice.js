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
  async function (data, { rejectWithValue }) {
    console.log(data)
    try {
      const response = await axios.post('/user/login/', JSON.stringify(data),
      {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
      });
      localStorage.setItem('accessToken', response?.data.access);
      localStorage.setItem('refreshToken', response?.data.refresh);
      router.back();
      if (!response.ok) {
        throw new Error('Server Error!');
      }
    } catch (err) {
      if (!err?.response.status) {
        return rejectWithValue('No Server Response');
      } else if (err?.response.status === 401) {
        return rejectWithValue(err.response.data.detail);
      } else {
        return rejectWithValue('Login Failed');
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
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { deAuthenticate, authenticate } = authSlice.actions;

export default authSlice.reducer;