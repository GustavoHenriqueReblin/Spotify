import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Music } from '../../types';

interface PersistedMusicState {
    audio: Music | null;
    volume: number | null;
    seconds: number | null;
    repeat: boolean | null;
    randomOrder: boolean | null;
};

const initialState: PersistedMusicState = {
    audio: null,
    volume: null,
    seconds: null,
    repeat: null,
    randomOrder: null,
};

const persistedMusicSlice = createSlice({
    name: 'persistedMusic',
    initialState,
    reducers: {
        setAudio: (state, action: PayloadAction<Music | null>) => {
            state.audio = action.payload;
        },
        setVolume: (state, action: PayloadAction<number | null>) => {
            state.volume = action.payload;
        },
        setSeconds: (state, action: PayloadAction<number | null>) => {
            state.seconds = action.payload;
        },
        setRepeat: (state, action: PayloadAction<boolean | null>) => {
            state.repeat = action.payload;
        },
        setRandomOrder: (state, action: PayloadAction<boolean | null>) => {
            state.randomOrder = action.payload;
        },
    },
});

export const { setAudio, setVolume, setSeconds, setRepeat, setRandomOrder } = persistedMusicSlice.actions;
export default persistedMusicSlice.reducer;
