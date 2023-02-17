import axios from '../pages/api/axios';

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.post('/user/refresh-token/',
            {
                refresh: localStorage.getItem('refreshToken'),
            },
            {
                withCredentials: true
            })
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;