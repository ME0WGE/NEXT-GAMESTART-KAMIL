"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addAction,
  removeFromCart as removeAction,
  setCartItems,
} from "@/lib/features/gameDetailsSlice";

export default function AddToCartButton({ gameId, className = "" }) {
  const dispatch = useDispatch();
  const { currentGame, addingToCart, hasAlreadyBoughtGame, error, cartItems } =
    useSelector((state) => state.gameDetails);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart items if empty
  useEffect(() => {
    const fetchCart = async () => {
      if (cartItems.length === 0) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const data = await response.json();
            dispatch(setCartItems(data));
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          // Don't show error for initial cart load
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCart();
  }, [dispatch, cartItems.length]);

  const handleClick = async () => {
    try {
      setShowError(false);
      setIsLoading(true);

      if (hasAlreadyBoughtGame) {
        await dispatch(removeAction(currentGame.id)).unwrap();
      } else {
        await dispatch(addAction(currentGame)).unwrap();
      }
    } catch (error) {
      console.error("Cart operation failed:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentGame) return null;

  return (
    <div className="flex flex-col">
      <button
        onClick={handleClick}
        disabled={addingToCart || isLoading}
        className={`bg-rosy hover:bg-pine text-white px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50 ${className}`}>
        {isLoading
          ? "Processing..."
          : hasAlreadyBoughtGame
          ? "Remove from Cart"
          : "Add to Cart"}
      </button>

      {showError && (
        <div className="text-red-500 mt-2 text-sm">
          There was an error with your cart. Please try again.
        </div>
      )}
    </div>
  );
}
