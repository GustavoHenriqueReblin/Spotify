import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';    
import { persistReducer, persistStore } from 'redux-persist';
import playistReducer from './playistSlice';
import musicReducer from './musicSlice';
import persistedPlaylistReducer from './persisted/persistedPlayistSlice';
import persistedMusicReducer from './persisted/persistedMusicSlice';

const persistConfig = {
    key: "root",
    blacklist: ["music", "playlist"],
    storage,
};

const rootReducer = combineReducers({
    playlist: playistReducer,
    persistedPlaylist: persistedPlaylistReducer,
    music: musicReducer,
    persistedMusic: persistedMusicReducer,
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
