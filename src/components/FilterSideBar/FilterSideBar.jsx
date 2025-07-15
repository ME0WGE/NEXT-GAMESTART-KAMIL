"use client";

import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import AllGames from "../AllGames/AllGames";
import CouponSection from "../CouponSection/CouponSection";
import {
  setFilterCategory,
  setFilteredGames,
  addActiveFilter,
} from "@/lib/features/searchSlice";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useAllGames } from "@/lib/hooks/useAllGames";

export default function FilterSideBar() {
  const dispatch = useDispatch();
  const {
    searchQuery,
    filterCategory,
    filteredGames,
    isSearchActive,
    activeFilters,
  } = useSelector((state) => state.search);
  const { randomPriceOfAllGames } = useAllGames();

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availablePublishers, setAvailablePublishers] = useState([]);

  // Extract unique genres and publishers from games data
  useEffect(() => {
    if (randomPriceOfAllGames && randomPriceOfAllGames.length > 0) {
      // Extract unique genres
      const genreSet = new Set();
      randomPriceOfAllGames.forEach((game) => {
        if (game.genre) genreSet.add(game.genre);
      });
      setAvailableGenres(Array.from(genreSet).sort());

      // Extract unique publishers
      const publisherSet = new Set();
      randomPriceOfAllGames.forEach((game) => {
        if (game.publisher) publisherSet.add(game.publisher);
      });
      setAvailablePublishers(Array.from(publisherSet).sort());
    }
  }, [randomPriceOfAllGames]);

  const handleFilterCategory = (category) => {
    dispatch(setFilterCategory(category));
  };

  const handleAddFilter = (type, value) => {
    dispatch(addActiveFilter({ type, value }));

    // Filter games based on active filters
    filterGamesByActiveFilters();
  };

  // Filter games based on active filters and search query
  const filterGamesByActiveFilters = () => {
    if (!randomPriceOfAllGames) return;

    // Create updated filters with the new one
    const updatedFilters = [...activeFilters];

    let filteredResults = [...randomPriceOfAllGames];

    // Apply genre filters
    const genreFilters = updatedFilters
      .filter((f) => f.type === "genre")
      .map((f) => f.value);
    if (genreFilters.length > 0) {
      filteredResults = filteredResults.filter(
        (game) => game.genre && genreFilters.includes(game.genre)
      );
    }

    // Apply publisher filters
    const publisherFilters = updatedFilters
      .filter((f) => f.type === "publisher")
      .map((f) => f.value);
    if (publisherFilters.length > 0) {
      filteredResults = filteredResults.filter(
        (game) => game.publisher && publisherFilters.includes(game.publisher)
      );
    }

    // Apply search query if exists
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filteredResults = filteredResults.filter((game) =>
        game.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Add match type for display grouping
    filteredResults = filteredResults.map((game) => ({
      ...game,
      matchType: "title", // Default to title for filter results
    }));

    dispatch(setFilteredGames(filteredResults));
  };

  // Group filtered games by their match type
  const groupedResults = filteredGames.reduce((acc, game) => {
    if (!acc[game.matchType]) {
      acc[game.matchType] = [];
    }
    // Only add unique games (by ID)
    if (!acc[game.matchType].some((g) => g.id === game.id)) {
      acc[game.matchType].push(game);
    }
    return acc;
  }, {});

  return (
    <>
      <div className="flex flex-col text-start text-ivory">
        <SearchBar />
        <span className="mb-2 font-semibold">Filter By</span>
        <ul className="flex flex-col w-max gap-2 mb-4">
          <li
            className={`text-start cursor-pointer px-3 py-1 rounded ${
              filterCategory === "title"
                ? "bg-rosy text-white"
                : "hover:bg-midnight/50"
            }`}
            onClick={() => handleFilterCategory("title")}>
            Title
          </li>

          {/* Genre category with hover expansion */}
          <li
            className="relative"
            onMouseEnter={() => setHoveredCategory("genre")}
            onMouseLeave={() => setHoveredCategory(null)}>
            <div
              className={`text-start cursor-pointer px-3 py-1 rounded flex items-center justify-between ${
                filterCategory === "genre"
                  ? "bg-rosy text-white"
                  : "hover:bg-midnight/50"
              }`}
              onClick={() => handleFilterCategory("genre")}>
              <span>Genre</span>
              {hoveredCategory === "genre" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>

            {/* Expanded genre list */}
            {hoveredCategory === "genre" && (
              <div className="absolute top-full left-0 bg-midnight/90 border border-ivory/20 rounded-md p-3 z-10 w-[20vw] max-h-80 overflow-y-auto shadow-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2 pb-1 border-b border-ivory/20">
                  All Genres
                </h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {availableGenres.slice(0, 10).map((genre) => (
                    <li
                      key={genre}
                      className="cursor-pointer text-sm hover:text-rosy truncate"
                      onClick={() => handleAddFilter("genre", genre)}>
                      {genre}
                    </li>
                  ))}
                </ul>
                {availableGenres.length > 10 && (
                  <div className="mt-2 pt-2 border-t border-ivory/10 text-sm text-ivory/60">
                    +{availableGenres.length - 10} more genres
                  </div>
                )}
              </div>
            )}
          </li>

          {/* Publisher category with hover expansion */}
          <li
            className="relative"
            onMouseEnter={() => setHoveredCategory("publisher")}
            onMouseLeave={() => setHoveredCategory(null)}>
            <div
              className={`text-start cursor-pointer px-3 py-1 rounded flex items-center justify-between ${
                filterCategory === "publisher"
                  ? "bg-rosy text-white"
                  : "hover:bg-midnight/50"
              }`}
              onClick={() => handleFilterCategory("publisher")}>
              <span>Publisher</span>
              {hoveredCategory === "publisher" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>

            {/* Expanded publisher list */}
            {hoveredCategory === "publisher" && (
              <div className="absolute top-full left-0 bg-midnight/90 border border-ivory/20 rounded-md p-3 z-10 w-[20vw] max-h-80 overflow-y-auto shadow-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2 pb-1 border-b border-ivory/20">
                  All Publishers
                </h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {availablePublishers.slice(0, 10).map((publisher) => (
                    <li
                      key={publisher}
                      className="cursor-pointer text-sm hover:text-rosy truncate"
                      onClick={() => handleAddFilter("publisher", publisher)}>
                      {publisher}
                    </li>
                  ))}
                </ul>
                {availablePublishers.length > 10 && (
                  <div className="mt-2 pt-2 border-t border-ivory/10 text-sm text-ivory/60">
                    +{availablePublishers.length - 10} more publishers
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>

        {/* Display search results when search is active */}
        {isSearchActive && filteredGames.length > 0 && (
          <div className="mb-6 bg-midnight/30 p-4 rounded-lg border border-ivory/10">
            <h3 className="font-semibold mb-2">
              Search Results ({filteredGames.length})
            </h3>

            {/* Title results */}
            {groupedResults.title && groupedResults.title.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-ivory/80 mb-2">
                  Title Matches
                </h4>
                <ul className="pl-3">
                  {groupedResults.title.slice(0, 5).map((game) => (
                    <li
                      key={`title-${game.id}`}
                      className="mb-2 hover:text-rosy">
                      <a
                        href={`/game/${game.id}`}
                        className="flex items-center gap-2">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{game.title}</span>
                      </a>
                    </li>
                  ))}
                  {groupedResults.title.length > 5 && (
                    <li className="text-sm text-ivory/70">
                      +{groupedResults.title.length - 5} more matches
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Genre results */}
            {groupedResults.genre && groupedResults.genre.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-ivory/80 mb-2">
                  Genre Matches
                </h4>
                <ul className="pl-3">
                  {groupedResults.genre.slice(0, 5).map((game) => (
                    <li
                      key={`genre-${game.id}`}
                      className="mb-2 hover:text-rosy">
                      <a
                        href={`/game/${game.id}`}
                        className="flex items-center gap-2">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{game.title}</span>
                        <span className="text-xs text-ivory/60">
                          ({game.genre})
                        </span>
                      </a>
                    </li>
                  ))}
                  {groupedResults.genre.length > 5 && (
                    <li className="text-sm text-ivory/70">
                      +{groupedResults.genre.length - 5} more matches
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Publisher results */}
            {groupedResults.publisher &&
              groupedResults.publisher.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-ivory/80 mb-2">
                    Publisher Matches
                  </h4>
                  <ul className="pl-3">
                    {groupedResults.publisher.slice(0, 5).map((game) => (
                      <li
                        key={`publisher-${game.id}`}
                        className="mb-2 hover:text-rosy">
                        <a
                          href={`/game/${game.id}`}
                          className="flex items-center gap-2">
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{game.title}</span>
                          <span className="text-xs text-ivory/60">
                            ({game.publisher})
                          </span>
                        </a>
                      </li>
                    ))}
                    {groupedResults.publisher.length > 5 && (
                      <li className="text-sm text-ivory/70">
                        +{groupedResults.publisher.length - 5} more matches
                      </li>
                    )}
                  </ul>
                </div>
              )}
          </div>
        )}

        {isSearchActive &&
          filteredGames.length === 0 &&
          searchQuery.trim() !== "" && (
            <div className="bg-midnight/30 p-4 rounded-lg text-ivory/80 mb-6">
              No results found for "{searchQuery}"
            </div>
          )}

        <CouponSection />
      </div>
      <div>{!isSearchActive && <AllGames />}</div>
    </>
  );
}
