import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        error: null,
        loading: false,
    },
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signinSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },

        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        signOutStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signOutSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        },

        signOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signinStart, signinSuccess, signinFailure, signOutStart, signOutSuccess, signOutFailure } =
    userSlice.actions;

export default userSlice.reducer;
