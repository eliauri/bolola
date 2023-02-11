import { authenticate, deAuthenticate } from './auth-slice';

export const loginUser = () => async (dispatch) => {
  dispatch(authenticate());
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch(deAuthenticate());
};


