import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Music } from '../../types';

interface PersistedPlaylistState {
    playlistId: number | null;
    playlistIsRunningId: number | null;
    currentIndex: number | null;
    musics: Music[] | [];
};

const initialState: PersistedPlaylistState = {
    playlistId: null,
    playlistIsRunningId: null,
    currentIndex: null,
    musics: [],
};

const persistedPlaylistSlice = createSlice({
    name: 'persistedPlaylist',
    initialState,
    reducers: {
        setPlaylistId: (state, action: PayloadAction<number | null>) => {
            state.playlistId = action.payload;
        },
        setPlaylistIsRunningId: (state, action: PayloadAction<number | null>) => {
            state.playlistIsRunningId = action.payload;
        },
        setCurrentIndex: (state, action: PayloadAction<number | null>) => {
            state.currentIndex = action.payload;
        },
        setMusics: (state, action: PayloadAction<Music[] | []>) => {
            state.musics = action.payload;
        },
    },
});

export const { setPlaylistId, setPlaylistIsRunningId, setCurrentIndex, setMusics } = persistedPlaylistSlice.actions;
export default persistedPlaylistSlice.reducer;
