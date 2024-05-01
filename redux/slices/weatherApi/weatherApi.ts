import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const openWeatherApi = createApi({
  reducerPath: 'openWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (params) => ({
        url: `weather?q=${params.location}&appid=${API_KEY}&units=metric`,
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetCurrentWeatherQuery } = openWeatherApi;
