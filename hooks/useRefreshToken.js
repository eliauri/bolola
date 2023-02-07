import axios from '../pages/api/axios';
import { getCookie, setCookie } from "cookies-next";

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.post('/user/refresh-token/',
        {
            refresh: getCookie('refreshToken'),
        },
        {
            withCredentials: true
        });
        setCookie('accessToken', response.data.access );
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;