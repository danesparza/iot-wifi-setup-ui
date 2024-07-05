// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const hostname = window.location.hostname;
const apiUrl = `//${hostname}:3070/v1/`;
// const apiUrl = `http://fx-1.iot:3070/v1/`;

// Define a service using a base URL and expected endpoints
export const iotApi = createApi({
    reducerPath: 'iotApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        configureAPMode: builder.mutation({
            query: ({...apModeParams}) => ({
                url: `configure/apmode`,
                method: 'PUT',
                body: apModeParams,
            }),
        }),
        configureClient: builder.mutation({
            query: ({...clientParams}) => ({
                url: `configure/client`,
                method: 'PUT',
                body: clientParams,
            }),
        }),
        getStatus: builder.query({
            query: () => `status`,
        }),
        getWifiAPs: builder.query({
            query: () => `aps`,
            providesTags: ['WIFIAPs']
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useConfigureAPModeMutation,
    useConfigureClientMutation,
    useGetStatusQuery,
    useGetWifiAPsQuery} = iotApi