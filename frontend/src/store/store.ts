import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';    
import { persistReducer, persistStore } from 'redux-persist';
import playlistReducer from './slice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, playlistReducer);

export const store = configureStore({
    reducer: {
        playlistId: persistedReducer,
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
