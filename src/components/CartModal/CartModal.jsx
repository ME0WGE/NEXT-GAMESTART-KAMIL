"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import { removeFromCart, addToCart } from "@/lib/features/gameDetailsSlice";
import Link from "next/link";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems } = useSelector((state) => state.gameDetails);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [addingGameId, setAddingGameId] = useState(null);
  const [removingGameId, setRemovingGameId] = useState(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Check if a game is in the cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Handle adding item to cart
  const handleAddToCart = async (game) => {
    try {
      setAddingGameId(game.id);
      // Add price if not present
      const gameWithPrice = {
        ...game,
        price: game.price || `${Math.floor(Math.random() * 96) + 5}.99`,
      };
      await dispatch(addToCart(gameWithPrice)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingGameId(null);
    }
  };

  // Handle removing item from cart
  const handleRemoveFromCart = async (gameId) => {
    try {
      setRemovingGameId(gameId);
      await dispatch(removeFromCart(gameId)).unwrap();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setRemovingGameId(null);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price || "0");
    return total + price;
  }, 0);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - Full screen on mobile, semi-transparent overlay on desktop */}
      <div className="fixed inset-0 bg-midnight/50 z-50 transition" />

      {/* Modal - Full screen on mobile, lateral on desktop */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-slate-900 transition-all duration-200 ease-in-out
                   md:max-w-md w-full shadow-lg transform ${
                     isOpen ? "translate-x-0" : "translate-x-full"
                   }`}
        ref={modalRef}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-ivory flex items-center">
            <ShoppingBag className="mr-2 text-pine" /> Mon Panier
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-ivory p-1 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Body - Cart Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-12rem)]">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-ivory">
              <ShoppingBag className="mx-auto mb-4 opacity-30" size={48} />
              <p>Votre panier est vide</p>
              <Link href="/library">
                <button
                  onClick={onClose}
                  className="mt-4 bg-rosy text-ivory px-4 py-2 rounded-lg hover:bg-plum transition-colors">
                  Voir les jeux
                </button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ivory">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex">
                  {/* Game Thumbnail */}
                  <div className="h-16 w-28 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>

                  {/* Game Info */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-ivory font-medium">{item.title}</h3>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        disabled={removingGameId === item.id}
                        className="text-red-400 hover:text-red-300 p-1 disabled:opacity-50">
                        {removingGameId === item.id ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                    <p className="text-ivory font-bold">{item.price}€</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-slate-800 p-4 border-t border-ivory">
            <div className="flex justify-between items-center mb-4">
              <span className="text-ivory">Total</span>
              <span className="text-ivory font-bold text-xl">
                {totalPrice.toFixed(2)}€
              </span>
            </div>
            <Link href="/checkout" className="w-full block">
              <button
                onClick={onClose}
                className="w-full bg-moss hover:bg-pine text-ivory py-3 rounded-lg font-bold transition-colors">
                Passer la commande
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
