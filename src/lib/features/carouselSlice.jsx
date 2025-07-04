import { createSlice } from "@reduxjs/toolkit";

{
  /* --------------------------------------------------------------------|
    --------------------------- Initial State ---------------------------|
  */
}
const initialState = {
  currentHighlight: 0,
  highlights: [],
  loading: true,
  autoSlideInterval: null,
};

{
  /* --------------------------------------------------------------------|
    --------------------------- Carousel Slice ---------------------------|
  */
}
const CarouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    // --------------------------------------------------------------------|
    // --------------------------- Setters ---------------------------|
    // --------------------------------------------------------------------|
    setCurrentHighlight: (state, action) => {
      state.currentHighlight = action.payload;
    },
    setHighlights: (state, action) => {
      state.highlights = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAutoSlideInterval: (state, action) => {
      state.autoSlideInterval = action.payload;
    },

    // --------------------------------------------------------------------|
    // --------------------------- Actions ---------------------------|
    // --------------------------------------------------------------------|
    nextHighlight: (state) => {
      if (state.loading || state.highlights.length === 0) return;
      state.currentHighlight =
        (state.currentHighlight + 1) % state.highlights.length;
    },
    prevHighlight: (state) => {
      if (state.loading || state.highlights.length === 0) return;
      state.currentHighlight =
        (state.currentHighlight - 1 + state.highlights.length) %
        state.highlights.length;
    },
    goToHighlight: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.highlights.length) {
        state.currentHighlight = index;
      }
    },
  },
});

{
  /* --------------------------------------------------------------------|
    --------------------------- Exports ---------------------------|
  */
}
export const {
  setCurrentHighlight,
  setHighlights,
  setLoading,
  nextHighlight,
  prevHighlight,
  goToHighlight,
  setAutoSlideInterval,
} = CarouselSlice.actions;

export const CarouselReducer = CarouselSlice.reducer;
