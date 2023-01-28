import { deleteCookie } from 'cookies-next';
import { authenticate, deAuthenticate } from './auth-slice';

export const loginUser = () => async (dispatch) => {
  dispatch(authenticate());
};

export const logoutUser = () => async (dispatch) => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  dispatch(deAuthenticate());
};


