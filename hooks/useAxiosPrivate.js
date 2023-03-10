import { axiosPrivate } from "../pages/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth/action-creators';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const dispatch = useDispatch();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.data.code == "user_not_found") {
                    dispatch(logoutUser());
                }
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;