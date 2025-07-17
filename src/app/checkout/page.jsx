"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import { purchaseGames, useUserCredits } from "@/lib/features/authSlice";
import {
  X,
  Check,
  ShoppingCart,
  CreditCard,
  Loader,
  Wallet,
} from "lucide-react";
import { apiService } from "@/lib/services/apiService";

export default function Checkout() {
  const { user, isLoading, successMessage } = useSelector(
    (state) => state.auth
  );
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [total, setTotal] = useState(0);
  const [fetchingCart, setFetchingCart] = useState(true);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // creditCard or credits
  const [creditError, setCreditError] = useState("");

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setFetchingCart(true);
        const data = await apiService.getCart();
        setCartItems(data);

        // Calculate total
        const sum = data.reduce((acc, item) => {
          const price = parseFloat(item.price);
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
      successMessage === "Purchase completed with credits"
    ) {
      setPurchaseComplete(true);
    }
  }, [successMessage]);

  // Check if user is authenticated with either Redux or NextAuth
  const isAuthenticated = user.isConnected || !!session;

  // If not logged in, show login component
  if (!isAuthenticated) {
    return <Login />;
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setCreditError("");

    try {
      // Get the correct user ID - check Redux user first, then fallback to email lookup
      const userId = user.id || (await getUserIdFromEmail());
      if (!userId) {
        throw new Error("Unable to determine user ID for checkout");
      }

      if (paymentMethod === "credits") {
        // Check if user has enough credits
        if ((user.credits || 0) < total) {
          setCreditError(
            `Insufficient credits. You need ${total.toFixed(
              2
            )} credits but only have ${user.credits?.toFixed(2) || 0}.`
          );
          setIsCheckingOut(false);
          return;
        }

        // Use credits for payment
        await dispatch(useUserCredits({ userId, amount: total })).unwrap();
      } else {
        // Regular purchase
        await dispatch(purchaseGames(userId)).unwrap();
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      if (error.includes && error.includes("Insufficient credits")) {
        setCreditError("Insufficient credits for this purchase.");
      }
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
      // Update local state
      setCartItems([]);
      setTotal(0);
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
                    <div className="ml-4 font-medium">${item.price}</div>
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

              {/* Payment Method Selection */}
              <div className="mb-4">
                <p className="text-neutral-300 mb-2">Payment Method</p>
                <div className="space-y-2">
                  <label className="flex items-center bg-neutral-700/30 p-3 rounded-md cursor-pointer hover:bg-neutral-700/50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === "creditCard"}
                      onChange={() => {
                        setPaymentMethod("creditCard");
                        setCreditError("");
                      }}
                      className="mr-2"
                    />
                    <CreditCard size={16} className="mr-2" />
                    <span>Credit Card (Simulated)</span>
                  </label>

                  <label
                    className={`flex items-center bg-neutral-700/30 p-3 rounded-md cursor-pointer hover:bg-neutral-700/50 transition-colors ${
                      (user.credits || 0) < total ? "opacity-75" : ""
                    }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credits"
                      checked={paymentMethod === "credits"}
                      onChange={() => {
                        setPaymentMethod("credits");
                        setCreditError("");
                      }}
                      className="mr-2"
                    />
                    <Wallet size={16} className="mr-2" />
                    <div className="flex flex-col">
                      <span>Store Credits</span>
                      <div className="flex items-center text-xs mt-1">
                        <span
                          className={`${
                            (user.credits || 0) >= total
                              ? "text-pine"
                              : "text-red-400"
                          }`}>
                          Balance: ${user.credits?.toFixed(2) || "0.00"}
                        </span>
                        {(user.credits || 0) < total && (
                          <span className="ml-2 text-red-400">
                            (Insufficient)
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                {creditError && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-sm">
                    {creditError}
                  </div>
                )}
              </div>

              <button
                onClick={handleCheckout}
                disabled={
                  isCheckingOut ||
                  cartItems.length === 0 ||
                  (paymentMethod === "credits" && (user.credits || 0) < total)
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

              {paymentMethod === "credits" &&
                (user.credits || 0) < total &&
                !creditError && (
                  <div className="mt-2 text-center text-sm text-neutral-400">
                    <a href="/profile" className="text-pine hover:underline">
                      Add more credits
                    </a>{" "}
                    to your account to complete this purchase.
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
