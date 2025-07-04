import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../features/authSlice";
import { CarouselReducer } from "../features/carouselSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    carousel: CarouselReducer,
  },
});
