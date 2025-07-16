"use client";

import { useAllGames } from "@/lib/hooks/useAllGames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setFilteredGames,
  clearSearch,
  removeActiveFilter,
} from "@/lib/features/searchSlice";
import { Search, X, Filter } from "lucide-react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery, filterCategory, activeFilters } = useSelector(
    (state) => state.search
  );
  const [isFocused, setIsFocused] = useState(false);
  const { randomPriceOfAllGames } = useAllGames();

  // Keep the input focused as long as there's at least 1 char
  useEffect(() => {
    searchQuery === "" ? setIsFocused(false) : setIsFocused(true);
  }, [searchQuery]);

  useEffect(() => {
    if (activeFilters.length > 0 || searchQuery) {
      filterGames();
    }
  }, [activeFilters, searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    if (value.trim() === "" && activeFilters.length === 0) {
      dispatch(clearSearch());
      return;
    }
  };

  const filterGames = () => {
    if (!randomPriceOfAllGames) return;

    let results = [...randomPriceOfAllGames];

    // Apply active filters
    if (activeFilters.length > 0) {
      // Apply genre filters
      const genreFilters = activeFilters
        .filter((f) => f.type === "genre")
        .map((f) => f.value);
      if (genreFilters.length > 0) {
        results = results.filter(
          (game) => game.genre && genreFilters.includes(game.genre)
        );
      }

      // Apply publisher filters
      const publisherFilters = activeFilters
        .filter((f) => f.type === "publisher")
        .map((f) => f.value);
      if (publisherFilters.length > 0) {
        results = results.filter(
          (game) => game.publisher && publisherFilters.includes(game.publisher)
        );
      }
    }

    // Apply search query if exists
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();

      // If specific filter category is selected
      if (filterCategory === "title") {
        results = results.filter((game) =>
          game.title.toLowerCase().includes(lowercaseQuery)
        );
      } else if (filterCategory === "genre") {
        results = results.filter(
          (game) =>
            game.genre && game.genre.toLowerCase().includes(lowercaseQuery)
        );
      } else if (filterCategory === "publisher") {
        results = results.filter(
          (game) =>
            game.publisher &&
            game.publisher.toLowerCase().includes(lowercaseQuery)
        );
      } else {
        // Search in all fields
        const titleMatches = results
          .filter((game) => game.title.toLowerCase().includes(lowercaseQuery))
          .map((game) => ({ ...game, matchType: "title" }));

        const genreMatches = results
          .filter(
            (game) =>
              game.genre && game.genre.toLowerCase().includes(lowercaseQuery)
          )
          .map((game) => ({ ...game, matchType: "genre" }));

        const publisherMatches = results
          .filter(
            (game) =>
              game.publisher &&
              game.publisher.toLowerCase().includes(lowercaseQuery)
          )
          .map((game) => ({ ...game, matchType: "publisher" }));

        results = [...titleMatches, ...genreMatches, ...publisherMatches];
        return dispatch(setFilteredGames(results));
      }
    }

    // Add match type for display grouping when there's no specific search
    results = results.map((game) => ({
      ...game,
      matchType: "title", // Default to title for filter results
    }));

    dispatch(setFilteredGames(results));
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const handleRemoveFilter = (type, value) => {
    dispatch(removeActiveFilter({ type, value }));
  };

  const getFilterColor = (type) => {
    switch (type) {
      case "genre":
        return "bg-moss/90 text-ivory";
      case "publisher":
        return "bg-plum/90 text-ivory";
      default:
        return "bg-rosy/90 text-ivory";
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex">
        <input
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search for games, genres, publishers..."
          className={`w-full bg-midnight/70 text-ivory px-4 py-3 rounded-l-lg border ${
            isFocused
              ? "border-rosy/70 ring-2 ring-rosy/30"
              : "border-ivory/20 focus:border-rosy/70 focus:ring-2 focus:ring-rosy/30"
          } placeholder-ivory/50 focus:outline-none transition-all duration-300`}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-ivory/70 hover:text-ivory">
            <X size={16} />
          </button>
        )}
        <button className="bg-rosy hover:bg-pine transition-colors duration-300 text-ivory px-5 py-3 rounded-r-lg flex items-center justify-center">
          <Search size={18} />
        </button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <div className="flex items-center text-ivory/70">
            <Filter size={14} className="mr-1" />
            <span className="text-sm">Active filters:</span>
          </div>

          {activeFilters.map((filter, index) => (
            <div
              key={`${filter.type}-${filter.value}-${index}`}
              className={`${getFilterColor(
                filter.type
              )} px-3 py-1 rounded-md text-xs flex items-center gap-2 shadow-sm`}>
              <span className="font-medium capitalize">{filter.type}:</span>
              <span>{filter.value}</span>
              <button
                onClick={() => handleRemoveFilter(filter.type, filter.value)}
                className="hover:text-ivory/80 transition-colors ml-1">
                <X size={14} />
              </button>
            </div>
          ))}

          {activeFilters.length > 0 && (
            <button
              onClick={handleClearSearch}
              className="text-xs text-ivory/60 hover:text-ivory underline ml-1">
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
