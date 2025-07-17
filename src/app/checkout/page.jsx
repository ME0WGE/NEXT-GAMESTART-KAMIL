"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import {
  purchaseGames,
  purchaseGamesWithCredits,
} from "@/lib/features/authSlice";
import { setCartItems } from "@/lib/features/gameDetailsSlice";
import {
  X,
  Check,
  ShoppingCart,
  CreditCard,
  Loader,
  AlertCircle,
} from "lucide-react";
import { apiService } from "@/lib/services/apiService";

export default function Checkout() {
  const { user, isLoading, successMessage } = useSelector(
    (state) => state.auth
  );
  const [cartItems, setCartItemsLocal] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [total, setTotal] = useState(0);
  const [fetchingCart, setFetchingCart] = useState(true);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "credits"
  const [checkoutError, setCheckoutError] = useState("");

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setFetchingCart(true);
        const data = await apiService.getCart();
        setCartItemsLocal(data);

        // Calculate total using priceToPay if available, otherwise use price
        const sum = data.reduce((acc, item) => {
          const price = parseFloat(item.priceToPay || item.price);
          return acc + price;
        }, 0);

        setTotal(sum);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setFetchingCart(false);
      }
    };

    fetchCart();
  }, []);

  // Check for successful purchase
  useEffect(() => {
    if (
      successMessage === "Purchase completed successfully" ||
      successMessage === "Purchase completed successfully with credits"
    ) {
      // Clear both local state and Redux state
      setCartItemsLocal([]);
      setTotal(0);
      dispatch(setCartItems([])); // Clear Redux cart state
      setPurchaseComplete(true);
    }
  }, [successMessage, dispatch]);

  // Check if user is authenticated with either Redux or NextAuth
  const isAuthenticated = user.isConnected || !!session;

  // Check if user has sufficient credits
  const hasSufficientCredits = (user.creditBalance || 0) >= total;
  const creditBalance = user.creditBalance || 0;

  // If not logged in, show login component
  if (!isAuthenticated) {
    return <Login />;
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      // Get the correct user ID - check Redux user first, then fallback to email lookup
      const userId = user.id || (await getUserIdFromEmail());
      if (!userId) {
        throw new Error("Unable to determine user ID for checkout");
      }

      if (paymentMethod === "credits") {
        // Purchase with credits
        await dispatch(purchaseGamesWithCredits({ userId, total })).unwrap();
      } else {
        // Regular purchase
        await dispatch(purchaseGames(userId)).unwrap();
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setCheckoutError(error || "Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Helper function to get user ID by email from session
  const getUserIdFromEmail = async () => {
    if (!session?.user?.email) return null;

    try {
      // Query the API to find the user by email
      const response = await fetch(
        `/api/users/lookup?email=${encodeURIComponent(session.user.email)}`
      );
      const data = await response.json();

      if (data.success && data.user) {
        return data.user.id;
      }
      return null;
    } catch (error) {
      console.error("Error looking up user ID:", error);
      return null;
    }
  };

  const handleClearCart = async () => {
    try {
      // Clear cart from server
      for (const item of cartItems) {
        await fetch(`/api/cart/remove?gameId=${item.id}`, {
          method: "DELETE",
        });
      }
      // Update both local state and Redux state
      setCartItemsLocal([]);
      setTotal(0);
      dispatch(setCartItems([])); // Clear Redux cart state
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (fetchingCart || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center pt-20">
        <div className="flex items-center">
          <Loader className="animate-spin mr-2" />
          <p>Loading checkout information...</p>
        </div>
      </div>
    );
  }

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto w-full bg-neutral-800 rounded-lg p-8 my-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-pine rounded-full p-3">
              <Check size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Purchase Complete!</h1>
          <p className="text-neutral-300 mb-6">
            Your games have been added to your library.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/library")}
              className="px-6 py-3 bg-pine text-white rounded-md hover:bg-pine/90 transition">
              Go to Library
            </button>
            <button
              onClick={() => router.push("/games")}
              className="px-6 py-3 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 transition">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto w-full bg-neutral-800 rounded-lg p-8 my-8 text-center">
          <ShoppingCart size={48} className="mx-auto mb-4 text-neutral-400" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-neutral-400 mb-6">
            Add some games to your cart before checking out.
          </p>
          <button
            onClick={() => router.push("/games")}
            className="px-6 py-3 bg-pine text-white rounded-md hover:bg-pine/90 transition">
            Browse Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ShoppingCart size={20} className="mr-2" />
                Cart Items
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-neutral-700/50 p-3 rounded-md">
                    <div className="flex-shrink-0 w-16 h-16 mr-4 relative rounded overflow-hidden">
                      <img
                        src={
                          item.thumbnail ||
                          "https://via.placeholder.com/80?text=Game"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-neutral-400 text-sm">
                        Digital Download
                      </p>
                    </div>
                    <div className="ml-4 font-medium">
                      {item.hasDiscount && item.discountedPrice ? (
                        <div className="text-right">
                          <div className="line-through text-neutral-400 text-sm">
                            ${item.price}
                          </div>
                          <div className="text-green-400">
                            ${item.priceToPay || item.discountedPrice}
                          </div>
                        </div>
                      ) : (
                        <span>${item.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={handleClearCart}
                  className="text-red-400 hover:text-red-300 flex items-center text-sm">
                  <X size={16} className="mr-1" />
                  Clear Cart
                </button>

                <div className="text-lg">
                  Total:{" "}
                  <span className="font-bold text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment section */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard size={20} className="mr-2" />
                Payment
              </h2>

              {/* Credit Balance Display */}
              <div className="bg-neutral-700/50 p-4 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-300 text-sm">
                    Credit Balance
                  </span>
                  <span className="text-lg font-bold text-white">
                    ${creditBalance.toFixed(2)}
                  </span>
                </div>
                {!hasSufficientCredits && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span>Insufficient balance</span>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-300 mb-3">
                  Payment Method
                </h3>

                {/* Banking Card Option */}
                <label className="flex items-center p-3 bg-neutral-700/50 rounded-md cursor-pointer hover:bg-neutral-700/70 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-pine" />
                    <span className="text-white">Banking Card</span>
                  </div>
                </label>

                {/* Credit Balance Option */}
                <label
                  className={`flex items-center p-3 rounded-md cursor-pointer transition-colors mt-2 ${
                    hasSufficientCredits
                      ? "bg-neutral-700/50 hover:bg-neutral-700/70"
                      : "bg-neutral-800/50 opacity-50 cursor-not-allowed"
                  }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credits"
                    checked={paymentMethod === "credits"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={!hasSufficientCredits}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-pine" />
                    <span className="text-white">Credit Balance</span>
                  </div>
                </label>
              </div>

              {/* Order Summary */}
              <div className="bg-neutral-700/50 p-4 rounded-md mb-4">
                <p className="text-neutral-300 mb-2">Order Summary</p>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-neutral-600 my-2"></div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Error Message */}
              {checkoutError && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                  <AlertCircle
                    size={16}
                    className="text-red-400 flex-shrink-0"
                  />
                  <p className="text-red-400 text-sm">{checkoutError}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={
                  isCheckingOut ||
                  cartItems.length === 0 ||
                  (paymentMethod === "credits" && !hasSufficientCredits)
                }
                className="w-full py-3 bg-pine hover:bg-pine/90 text-white rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
                {isCheckingOut ? (
                  <>
                    <Loader className="animate-spin mr-2" size={16} />
                    Processing...
                  </>
                ) : (
                  <>Complete Purchase</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
