import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
    userId: string;
    accessToken: string | null;
    errorMessage: string;
    status: boolean;
}

const initialState: IAuthState = {
    userId: "",
    accessToken: null,
    errorMessage: "",
    status: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserID: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearAuth: (state) => {
            state.userId = "";
            state.accessToken = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.errorMessage = "";
        },
        setStatus: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload
        }
    },
    extraReducers: () => { },
    selectors: {
        getUserId: (state) => state.userId,
        getAccessToken: (state) => state.accessToken,
        getErrorMessageFromAuthSlice: (state) => state.errorMessage,
        getStatusFromAuthSlice: (state) => state.status,
    }
});

export const { setUserID, setToken, clearAuth, setError, clearError, setStatus } = authSlice.actions;

export const { getUserId, getAccessToken, getErrorMessageFromAuthSlice, getStatusFromAuthSlice } = authSlice.selectors;

export default authSlice.reducer;
