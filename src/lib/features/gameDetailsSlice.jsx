import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";

export const fetchGameDetails = createAsyncThunk(
  "gameDetails/fetchGameDetails",
  async (gameId, { rejectWithValue }) => {
    try {
      const game = await apiService.getGameById(gameId);
      game.price = `${Math.floor(Math.random() * 96) + 5}.99`;

      const hasDiscount = Math.random() < 0.5;
      game.discount = hasDiscount ? Math.floor(Math.random() * 41) + 10 : 0;
      game.discountedPrice = hasDiscount
        ? (parseFloat(game.price) * (1 - game.discount / 100)).toFixed(2)
        : game.price;

      // Placeholder video URL
      game.video = `https://www.freetogame.com/g/${gameId}/videoplayback.webm`;
      return game;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch game details");
    }
  }
);

export const addToCart = createAsyncThunk(
  "gameDetails/addToCart",
  async (game, { rejectWithValue }) => {
    try {
      const response = await apiService.addToCart(game);
      if (!response || !response.success) {
        return rejectWithValue(response?.message || "Failed to add to cart");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "gameDetails/removeFromCart",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await apiService.removeFromCart(gameId);
      if (!response || !response.success) {
        return rejectWithValue(
          response?.message || "Failed to remove from cart"
        );
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState: {
    currentGame: null,
    loading: false,
    error: null,
    cartItems: [],
    addingToCart: false,
    hasAlreadyBoughtGame: false,
  },
  reducers: {
    setGameDetails: (state, action) => {
      state.currentGame = action.payload;
    },
    setHasAlreadyBoughtGame: (state, action) => {
      state.hasAlreadyBoughtGame = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Manually set cart items
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
        state.error = null;
        // Check if game is in cart
        state.hasAlreadyBoughtGame = state.cartItems.some(
          (i) => i.id === action.payload.id
        );
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addingToCart = false;
        if (action.payload && action.payload.cart) {
          state.cartItems = action.payload.cart;
          // Check if current game is in cart
          if (state.currentGame) {
            state.hasAlreadyBoughtGame = action.payload.cart.some(
              (item) => item.id === state.currentGame.id
            );
          }
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addingToCart = false;
        state.error = action.payload || "Failed to add to cart";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.cart) {
          state.cartItems = action.payload.cart;
          state.hasAlreadyBoughtGame = state.cartItems.some(
            (i) => i.id === state.currentGame?.id
          );
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove from cart";
      });
  },
});

export const {
  setGameDetails,
  setHasAlreadyBoughtGame,
  setError,
  clearError,
  setCartItems,
} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer;
