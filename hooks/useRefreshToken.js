import UseAuth from './useAuth';
import axios from '../pages/api/axios';
// import Cookie from "js-cookie";
import { getCookie, setCookie } from "cookies-next";

const useRefreshToken = () => {
    // const { setAuth } = UseAuth();
    const refresh = async () => {
        const response = await axios.post('/user/refresh-token/',
        {
            refresh: getCookie('refreshToken'),
        },
        {
            withCredentials: true
        });
        // setAuth(prev => {
        //     return {
        //         ...prev,
        //         accessToken: response.data.access
        //     }
        // });
        setCookie('accessToken', response.data.access );

        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;