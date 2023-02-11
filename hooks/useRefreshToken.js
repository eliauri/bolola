import axios from '../pages/api/axios';
// import { getCookie, setCookie } from "cookies-next";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/action-creators';

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axios.post('/user/refresh-token/',
        {
            refresh: localStorage.getItem('refreshToken'),
        },
        {
            withCredentials: true
        })
        .catch( function (error){
            dispatch(logoutUser());
        });
        localStorage.setItem('accessToken', response.data.access );
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;