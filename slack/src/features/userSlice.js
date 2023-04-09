import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  //actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    changeUserDpColor: (state, color) => {
      state.user.userDPCol = color.payload;
    },
  },
});

export const { login, logout, changeUserDpColor } = userSlice.actions;
// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
