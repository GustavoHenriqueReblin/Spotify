import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
    value: number | undefined;
}

const initialState: PlaylistState = {
    value: undefined,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylistId: (state, action: PayloadAction<number | undefined>) => {
            state.value = action.payload;
        },
    },
});

export const { setPlaylistId } = playlistSlice.actions;
export default playlistSlice.reducer;
