import { createSlice } from "@reduxjs/toolkit";

const category = {
  title: "",
  genre: "",
  publisher: "",
};

const SearchSlice = createSlice({
  name: "search",
  initialState: category,

  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = SearchSlice.actions;

export default SearchSlice.reducer;
