import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice';
import tripSliceReducer from './slices/tripSlice';
import passengerSliceReducer from './slices/passengerSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        trip: tripSliceReducer,
        pass: passengerSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store