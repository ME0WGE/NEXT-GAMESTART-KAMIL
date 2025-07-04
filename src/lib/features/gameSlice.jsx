import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    mostPlayedGames: [],
    loading: false,
    error: null,
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMostPlayedGames: (state, action) => {
      state.mostPlayedGames = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setGames,
  setLoading,
  setMostPlayedGames,
  setError,
  clearError,
} = GameSlice.actions;

export const GameReducer = GameSlice.reducer;
