import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';    
import { persistReducer, persistStore } from 'redux-persist';
import playistReducer from './playistSlice';
import musicReducer from './musicSlice';

const persistConfig = {
    key: "root",
    blacklist: ["music"],
    storage,
};

const rootReducer = combineReducers({
    playlist: playistReducer,
    music: musicReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        global: persistedReducer,
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
