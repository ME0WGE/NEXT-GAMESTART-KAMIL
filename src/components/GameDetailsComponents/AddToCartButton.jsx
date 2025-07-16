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
  const { user } = useSelector((state) => state.auth);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  // Check if game is already owned
  useEffect(() => {
    if (user.purchasedGames && user.purchasedGames.length > 0) {
      setIsOwned(
        user.purchasedGames.some((game) => game.id === currentGame?.id)
      );
    } else {
      setIsOwned(false);
    }
  }, [user.purchasedGames, currentGame]);

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

  // If game is owned, show Owned badge instead of button
  if (isOwned) {
    return (
      <div
        className={`${className} inline-flex items-center justify-center px-4 py-2 bg-pine text-white rounded-md`}>
        Owned
      </div>
    );
  }

  const inCart = cartItems.some((item) => item.id === currentGame.id);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isOwned}
      className={`${className} ${
        inCart ? "bg-red-500 hover:bg-red-600" : "bg-pine hover:bg-pine/90"
      } text-white px-4 py-2 rounded-md transition-colors ${
        isLoading ? "opacity-75 cursor-not-allowed" : ""
      }`}>
      {isLoading ? "Loading..." : inCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}
