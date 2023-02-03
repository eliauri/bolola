import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  bolik: {
    hash: '',
    img: '',
  },
  activeStep: 0
}

export const bolik = createSlice({
  name: 'bolik',
  initialState: initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setBolik: (state, action) => {
      state.bolik.hash = action.payload;
    },
    setBolikImg: (state, action) => {
      state.bolik.img = action.payload;
    },
    clearBolik: (state) => {
      state.bolik = {
        hash: '',
        img: '',
      }
    },
  },
});

export const { setActiveStep, setBolik, setBolikImg, clearBolik} = bolik.actions;

export default bolik.reducer;