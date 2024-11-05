import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			state.currentUser = action.payload;
		},
		logoutUser: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	logoutUser,
	loginUser,
} = userSlice.actions;

export default userSlice.reducer;
