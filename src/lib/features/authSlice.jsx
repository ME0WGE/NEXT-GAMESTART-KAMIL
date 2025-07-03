const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
});

export const AuthReducer = AuthSlice.reducer;
