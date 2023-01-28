import Cookie from "js-cookie";
import useAuth from "./useAuth";

const useLogout = () => {
    // const { setAuth } = useAuth();

    const logout = async () => {
        // setAuth({});
        Cookie.remove('refreshToken');
        Cookie.remove('accessToken');
    }

    return logout;
}

export default useLogout