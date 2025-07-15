import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  filterCategory: "", // title, genre, or publisher
  filteredGames: [],
  isSearchActive: false,
};

const SearchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.isSearchActive = action.payload.length > 0;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilteredGames: (state, action) => {
      state.filteredGames = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.filterCategory = "";
      state.filteredGames = [];
      state.isSearchActive = false;
    },
  },
});

export const {
  setSearchQuery,
  setFilterCategory,
  setFilteredGames,
  clearSearch,
} = SearchSlice.actions;

export default SearchSlice.reducer;
