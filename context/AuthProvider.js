import Cookie from "js-cookie";
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    useEffect(() => {
        setAuth(Cookie.get("accessToken"))
    }, [])
    
    let refreshToken = Cookie.get("refreshToken");
    

    // checks if the user is authenticated or not
    const isUserAuthenticated = () => !!auth.accessToken;

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            refreshToken,
            isUserAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;