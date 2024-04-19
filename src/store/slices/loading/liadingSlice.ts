import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: () => { },
    selectors: {
        getLoadingState: (state) => state.isLoading,
    },
});

export const { setLoading } = loadingSlice.actions;

export const { getLoadingState } = loadingSlice.selectors;

export default loadingSlice.reducer;
