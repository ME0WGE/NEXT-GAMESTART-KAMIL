import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cookies: 0,
  cookiesPerSecond: 0,
};

const ClickerSlice = createSlice({
  name: "clicker",
  initialState,
  reducers: {
    clickCookie: (state, action) => {
      state.cookies += action.payload || 1;
    },
    upgradeCookie: (state) => {
      state.cookiesPerSecond += 1;
    },
    buyUpgrade: (state, action) => {
      if (state.cookies >= action.payload.price) {
        state.cookies -= action.payload.price;
        state.cookiesPerSecond += action.payload.value;
      }
    },
  },
});

export const { clickCookie, upgradeCookie, buyUpgrade } = ClickerSlice.actions;
export const ClickerReducer = ClickerSlice.reducer;
