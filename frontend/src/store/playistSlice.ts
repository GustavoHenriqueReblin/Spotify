import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
    isRunning: boolean;
};

const initialState: PlaylistState = {
    isRunning: false,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
    },
});

export const { setIsRunning } = playlistSlice.actions;
export default playlistSlice.reducer;
