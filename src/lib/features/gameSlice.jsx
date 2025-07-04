import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    mostPlayedGames: [],
    loading: false,
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
  },
});

export const { setGames, setLoading, setMostPlayedGames } = GameSlice.actions;

export const GameReducer = GameSlice.reducer;
