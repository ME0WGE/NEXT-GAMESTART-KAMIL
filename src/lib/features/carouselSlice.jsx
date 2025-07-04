const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const CarouselSlice = createSlice({
  name: "carousel",
  initialState,

  reducers: {},
});

export const CarouselReducer = CarouselSlice.reducer;
