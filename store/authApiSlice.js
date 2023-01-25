import { apiSlice } from "../pages/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login/',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getUser: builder.mutation({
            query: credentials => ({
                url: '/current-user-info/',
                method: 'GET',
            })
        })
    })
})

export const {
    useLoginMutation
} = authApiSlice