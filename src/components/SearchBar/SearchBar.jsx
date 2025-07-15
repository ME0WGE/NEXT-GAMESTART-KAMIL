"use client";

import { useAllGames } from "@/lib/hooks/useAllGames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setFilteredGames,
  clearSearch,
} from "@/lib/features/searchSlice";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery, filterCategory } = useSelector((state) => state.search);
  const [isFocused, setIsFocused] = useState(false);
  const { randomPriceOfAllGames } = useAllGames();

  // Keep the input focused as long as there's at least 1 char
  useEffect(() => {
    searchQuery === "" ? setIsFocused(false) : setIsFocused(true);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    if (value.trim() === "") {
      dispatch(clearSearch());
      return;
    }

    // Filter games based on search query and current filter category
    filterGames(value);
  };

  const filterGames = (query) => {
    if (!randomPriceOfAllGames || !query) return;

    const lowercaseQuery = query.toLowerCase();
    let results = [];

    // If no specific filter is selected, search in all fields
    if (!filterCategory || filterCategory === "") {
      const titleMatches = randomPriceOfAllGames
        .filter((game) => game.title.toLowerCase().includes(lowercaseQuery))
        .map((game) => ({ ...game, matchType: "title" }));

      const genreMatches = randomPriceOfAllGames
        .filter((game) => game.genre?.toLowerCase().includes(lowercaseQuery))
        .map((game) => ({ ...game, matchType: "genre" }));

      const publisherMatches = randomPriceOfAllGames
        .filter((game) =>
          game.publisher?.toLowerCase().includes(lowercaseQuery)
        )
        .map((game) => ({ ...game, matchType: "publisher" }));

      results = [...titleMatches, ...genreMatches, ...publisherMatches];
    } else {
      // Filter by specific category
      switch (filterCategory) {
        case "title":
          results = randomPriceOfAllGames
            .filter((game) => game.title.toLowerCase().includes(lowercaseQuery))
            .map((game) => ({ ...game, matchType: "title" }));
          break;
        case "genre":
          results = randomPriceOfAllGames
            .filter((game) =>
              game.genre?.toLowerCase().includes(lowercaseQuery)
            )
            .map((game) => ({ ...game, matchType: "genre" }));
          break;
        case "publisher":
          results = randomPriceOfAllGames
            .filter((game) =>
              game.publisher?.toLowerCase().includes(lowercaseQuery)
            )
            .map((game) => ({ ...game, matchType: "publisher" }));
          break;
        default:
          break;
      }
    }

    dispatch(setFilteredGames(results));
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <>
      <div className="flex w-full mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search..."
            className={
              isFocused
                ? "bg-midnight w-full text-ivory px-4 py-2 rounded-b-2xl rounded-t-lg focus:outline-none ring-2 ring-rosy/70"
                : "focus:outline-none bg-midnight w-full text-ivory px-4 py-2 rounded-b-2xl rounded-t-lg"
            }
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-ivory/70 hover:text-ivory">
              <X size={16} />
            </button>
          )}
        </div>
        <button className="bg-rosy text-ivory inline-block px-4 py-2 rounded-b-lg rounded-t-lg hover:bg-pine transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rosy/70 items-center">
          <Search size={18} />
        </button>
      </div>
    </>
  );
}
