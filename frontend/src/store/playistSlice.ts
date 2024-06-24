import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
    playlistId: number | null;
};

const initialState: PlaylistState = {
    playlistId: null,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylistId: (state, action: PayloadAction<number | null>) => {
            state.playlistId = action.payload;
        },
    },
});

export const { setPlaylistId } = playlistSlice.actions;
export default playlistSlice.reducer;
