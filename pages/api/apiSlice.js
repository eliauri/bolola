import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredetianals, logOut } from '../../store/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/user',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // if (result?.error) console.log(error, 'ошибка');

    if (result?.error?.originalStatus == 403) {
        console.log('отправка токена обновления');
        const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
        console.log('Новый токен,', refreshResult);
        if (refreshResult?.data) {
            api.dispatch(setCredetianals({...refreshResult.data}));
            let result = await baseQuery('/login', api, extraOptions)
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})