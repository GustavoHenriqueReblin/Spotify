import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicState {
    isRunning: boolean;
};

const initialState: MusicState = {
    isRunning: false,
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
    },
});

export const { setIsRunning } = musicSlice.actions;
export default musicSlice.reducer;
