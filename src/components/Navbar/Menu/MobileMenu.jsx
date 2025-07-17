import { ShoppingCart } from "lucide-react";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import Login from "../../Login";
import { NavbarNavLinksComponent } from "../NavLinks/NavbarNavLinks";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/lib/features/cartSlice";

function MobileMenu({ toggleMenu, isMenuOpen, toggleCart }) {
  const cartItems = useSelector(selectCartItems);
  const cartItemCount = cartItems?.length || 0;

  return (
    <>
      {/* Shopping Cart */}
      <div className="relative">
        <button
          onClick={toggleCart}
          className="text-slate-300 hover:text-pine hover:bg-rosy p-2 rounded-full transition-all duration-200 cursor-pointer">
          <ShoppingCart size={20} />
        </button>

        {/* Cart Counter Badge */}
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rosy text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </div>

      {/* Login */}
      <Login />

      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="text-slate-300 hover:text-pine hover:bg-rosy p-2 rounded-md transition-all duration-200 cursor-pointer">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
}

export function MobileMenuNavLinks({ links, toggleMenu }) {
  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Toggle Search
  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  // Focus on search input when search is open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when click outside of its body
  const handleSearchBlur = (e) => {
    setTimeout(() => setIsSearchOpen(false), 100);
  };

  // Security check to avoid error if links is undefined
  if (!links || !Array.isArray(links)) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Links */}
      <div className="md:hidden w-auto">
        <div className=" pt-2 pb-3 space-y-1 sm:px-3 bg-midnight rounded-lg mt-2 text-center">
          {links.map((link) => (
            <NavbarNavLinksComponent
              key={link.name}
              name={link.name}
              url={link.url}
              toggleMenu={toggleMenu}
            />
          ))}

          {/* Search */}
          <div className="flex items-center gap-2 mt-4 mx-4">
            <Search
              size={20}
              className="text-slate-300 hover:text-pine rounded-full transition-all duration-200 cursor-pointer"
              onClick={handleSearchClick}
              aria-label="Rechercher"
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher..."
              className="bg-midnight text-white px-3 py-2 rounded-md border border-slate-700 focus:outline-none focus:border-pine w-full text-sm"
              onBlur={handleSearchBlur}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
