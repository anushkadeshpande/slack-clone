import { createSlice } from "@reduxjs/toolkit";

export const currentChannelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: "main",
  },
  //actions
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { setChannel } = currentChannelSlice.actions;
// selectors
export const selectChannel = (state) => state.channel.channel;

export default currentChannelSlice.reducer;
