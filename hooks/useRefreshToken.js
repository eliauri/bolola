import axios from '../pages/api/axios';
import { getCookie, setCookie } from "cookies-next";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/action-creators';

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axios.post('/user/refresh-token/',
        {
            refresh: getCookie('refreshToken'),
        },
        {
            withCredentials: true
        })
        .catch( function (error){
            dispatch(logoutUser());
        });
        setCookie('accessToken', response.data.access );
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;