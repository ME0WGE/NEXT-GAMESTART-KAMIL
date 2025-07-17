import { Search, CreditCard } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Login from "../../Login";
import { useSelector } from "react-redux";

export default function DesktopMenu({
  isSearchOpen,
  handleSearchClick,
  handleSearchBlur,
  searchInputRef,
  toggleCart,
}) {
  const { cartItems } = useSelector((state) => state.gameDetails);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount = cartItems?.length || 0;

  return (
    <>
      {/* Search */}
      <div className="relative flex items-center">
        {/* Search Button */}
        <button
          className={`text-slate-300 hover:text-pine hover:bg-rosy p-2 rounded-full transition-all duration-200 focus:outline-none ${
            isSearchOpen ? "bg-rosy" : ""
          } cursor-pointer`}
          onClick={handleSearchClick}
          aria-label="Rechercher">
          <Search size={20} />
        </button>

        {/* Search Input */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isSearchOpen ? "w-48 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
          }`}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Rechercher..."
            className="bg-midnight text-white px-3 py-1 rounded-md border border-pine focus:outline-none focus:border-rosy w-full text-sm"
            onBlur={handleSearchBlur}
          />
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="relative">
        <button
          onClick={toggleCart}
          className="text-slate-300 hover:text-pine hover:bg-rosy p-2 rounded-full transition-all duration-200 cursor-pointer">
          <ShoppingCart size={20} />
        </button>

        {/* Cart Counter Badge */}
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-moss text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </div>

      {/* Credit Balance - Only show if user is logged in */}
      {user.isConnected && (
        <div className="flex items-center gap-2 bg-neutral-700/50 px-3 py-1 rounded-lg border border-neutral-600">
          <CreditCard size={16} className="text-pine" />
          <span className="text-sm font-medium text-white">
            {(user.creditBalance || 0).toFixed(2)} €
          </span>
        </div>
      )}

      {/* Login */}
      <Login />
    </>
  );
}
