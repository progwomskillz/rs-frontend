import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: "",
    refresh: "",
  },
  reducers: {
    setTokens: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    }
  }
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;
