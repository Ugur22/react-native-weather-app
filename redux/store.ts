import { configureStore } from '@reduxjs/toolkit';
import { openWeatherApi } from './slices/weatherApi/weatherApi';
import { locationSlice } from './slices/location/LocationSlice';

const store = configureStore({
    reducer: {
        [openWeatherApi.reducerPath]: openWeatherApi.reducer,
        location: locationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(openWeatherApi.middleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;