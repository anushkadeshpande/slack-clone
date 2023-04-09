import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
  },
  //actions
  reducers: {
    showMenu: (state) => {
      state.menu = true;
    },
    hideMenu: (state) => {
      state.menu = false;
    },
  },
});

export const { showMenu, hideMenu } = menuSlice.actions;
// selectors
export const selectMenu = (state) => state.menu.menu;

export default menuSlice.reducer;
