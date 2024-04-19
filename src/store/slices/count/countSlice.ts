import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const countSlice = createSlice({
    name: "count",
    initialState,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1
    },
    extraReducers: () => { },
    selectors: {
        getCount: (state) => state
    }
})

export const { increment, decrement } = countSlice.actions;

export const { getCount } = countSlice.selectors;

export default countSlice.reducer;