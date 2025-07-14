import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../features/authSlice";
import { CarouselReducer } from "../features/carouselSlice";
import { ClickerReducer } from "../features/clickerSlice";
import { GameReducer } from "../features/gameSlice";
import { SearchReducer } from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    carousel: CarouselReducer,
    clicker: ClickerReducer,
    game: GameReducer,
    search: SearchReducer,
  },
});
