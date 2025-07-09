import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Login from "../../Login";

export default function DesktopMenu({
  isSearchOpen,
  handleSearchClick,
  handleSearchBlur,
  searchInputRef,
}) {
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
      <button className="text-slate-300 hover:text-pine hover:bg-rosy p-2 rounded-full transition-all duration-200 cursor-pointer">
        <ShoppingCart size={20} />
      </button>

      {/* Login */}
      <Login />
    </>
  );
}
