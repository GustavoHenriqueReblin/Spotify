import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
    value: number | undefined;
}

const initialState: PlaylistState = {
    value: undefined,
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setPlaylistId: (state, action: PayloadAction<number | undefined>) => {
            state.value = action.payload;
        },
    },
});

export const { setPlaylistId } = globalSlice.actions;
export default globalSlice.reducer;
