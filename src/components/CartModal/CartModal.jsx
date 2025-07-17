"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, ShoppingBag, ShoppingCart, Tag } from "lucide-react";
import { removeFromCart, addToCart } from "@/lib/features/gameDetailsSlice";
import { 
  selectCartItems,
  selectOriginalPrices,
  selectDiscountedPrices,
  selectCouponDiscount,
  selectSubtotal,
  selectTotal,
  selectIsCouponApplicable
} from "@/lib/features/cartSlice";
import GamePrice from "@/components/GamePrice";
import Link from "next/link";

export default function CartModal({ isOpen, onClose }) {
  const cartItems = useSelector(selectCartItems);
  const originalPrices = useSelector(selectOriginalPrices);
  const discountedPrices = useSelector(selectDiscountedPrices);
  const couponDiscount = useSelector(selectCouponDiscount);
  const subtotal = useSelector(selectSubtotal);
  const total = useSelector(selectTotal);
  const isCouponApplicable = useSelector(selectIsCouponApplicable);
  
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
      await dispatch(addToCart(game)).unwrap();
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
              <Link href="/games">
                <button
                  onClick={onClose}
                  className="mt-4 bg-rosy text-ivory px-4 py-2 rounded-lg hover:bg-plum transition-colors">
                  Voir les jeux
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Coupon Info - If close to qualifying or already qualified */}
              {cartItems.length >= 3 && cartItems.length < 5 && (
                <div className="bg-midnight/80 mb-4 p-3 rounded-lg border border-pine/20">
                  <div className="flex items-center">
                    <Tag className="text-pine mr-2" size={18} />
                    <p className="text-sm text-ivory">
                      <span className="font-bold text-pine">
                        {5 - cartItems.length} jeux de plus
                      </span>{" "}
                      pour bénéficier du coupon "4+1 gratuit"!
                    </p>
                  </div>
                </div>
              )}

              <ul className="divide-y divide-ivory">
                {cartItems.map((item) => {
                  const originalPrice = originalPrices[item.id] || 0;
                  const discountedPrice = discountedPrices[item.id] || 0;
                  const hasDiscount = originalPrice > discountedPrice;
                  const isCheapestGame = isCouponApplicable && couponDiscount > 0 && 
                    discountedPrice === Math.min(...cartItems.map(cartItem => discountedPrices[cartItem.id] || 0));
                  
                  return (
                    <li
                      key={item.id}
                      className={`py-4 flex ${
                        isCheapestGame
                          ? "bg-pine/10 rounded-lg -mx-2 px-2"
                          : ""
                      }`}>
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
                        <div className="flex items-center">
                          {isCheapestGame ? (
                            <>
                              <p className="line-through text-slate-400 mr-2">
                                ${discountedPrice.toFixed(2)}
                              </p>
                              <p className="text-moss font-bold">FREE</p>
                              <span className="bg-pine/20 text-pine text-xs px-2 py-1 rounded ml-2">
                                Coupon 4+1
                              </span>
                            </>
                          ) : (
                            <div className="text-ivory">
                              {hasDiscount ? (
                                <div>
                                  <div className="line-through text-slate-400 text-sm">
                                    ${originalPrice.toFixed(2)}
                                  </div>
                                  <div className="text-green-400">
                                    ${discountedPrice.toFixed(2)}
                                  </div>
                                </div>
                              ) : (
                                <span>${originalPrice.toFixed(2)}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-slate-800 p-4 border-t border-ivory">
            {/* Subtotal and Discount */}
            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ivory">Subtotal</span>
                <span className="text-ivory">${subtotal.toFixed(2)}</span>
              </div>

              {isCouponApplicable && couponDiscount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-moss">
                    <Tag size={14} className="mr-1" />
                    Coupon "4+1 gratuit"
                  </span>
                  <span className="text-moss">-${couponDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-slate-700 pt-2 mt-2"></div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-ivory">Total</span>
              <span className="text-ivory font-bold text-xl">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" className="w-full block">
                <button
                  onClick={onClose}
                  className="w-full bg-moss hover:bg-pine text-ivory py-3 rounded-lg font-bold transition-colors">
                  Passer la commande
                </button>
              </Link>

              <button
                onClick={() =>
                  cartItems.forEach((item) => handleRemoveFromCart(item.id))
                }
                className="w-full text-red-400 hover:text-red-300 text-sm flex items-center justify-center py-2">
                <Trash2 size={14} className="mr-1" />
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
