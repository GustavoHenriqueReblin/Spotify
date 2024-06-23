import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './slice';

export const store = configureStore({
    reducer: {
        playlistId: playlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
