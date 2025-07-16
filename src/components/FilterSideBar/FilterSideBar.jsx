"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setFilterCategory,
  setFilteredGames,
  addActiveFilter,
} from "@/lib/features/searchSlice";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, ArrowRight, Filter } from "lucide-react";
import { useAllGames } from "@/lib/hooks/useAllGames";
import { useRouter } from "next/navigation";

export default function FilterSideBar() {
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [showAllItems, setShowAllItems] = useState({
    genres: false,
    publishers: false,
  });

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

  // Function to handle "show all" clicks
  const handleShowAllItems = (category) => {
    setShowAllItems((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle showing all search results for a specific category
  const handleViewAllCategoryResults = (category) => {
    // Set filter category to the specific category
    dispatch(setFilterCategory(category));
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

  return (
    <div className="text-ivory">
      <div className="flex items-center gap-2 mb-4 text-rosy">
        <Filter size={18} />
        <h2 className="text-lg font-semibold">Filtres</h2>
      </div>

      <div className="mb-5">
        <span className="text-sm text-ivory/80 font-medium mb-2 block">
          Filtrer par
        </span>
        <ul className="flex flex-col gap-1.5">
          <li
            className={`text-start cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors ${
              filterCategory === "title"
                ? "bg-rosy text-white"
                : "hover:bg-midnight/50 text-ivory/90"
            }`}
            onClick={() => handleFilterCategory("title")}>
            Titre
          </li>

          {/* Genre category with hover expansion */}
          <li
            className="relative"
            onMouseEnter={() => setHoveredCategory("genre")}
            onMouseLeave={() => setHoveredCategory(null)}>
            <div
              className={`text-start cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${
                filterCategory === "genre"
                  ? "bg-rosy text-white"
                  : "hover:bg-midnight/50 text-ivory/90"
              }`}
              onClick={() => handleFilterCategory("genre")}>
              <span>Genre</span>
              {hoveredCategory === "genre" ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            {/* Expanded genre list */}
            {hoveredCategory === "genre" && (
              <div className="absolute left-full top-0 ml-2 bg-midnight/90 border border-ivory/20 rounded-md p-3 z-10 w-64 max-h-80 overflow-y-auto shadow-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2 pb-1 border-b border-ivory/20 text-sm">
                  Tous les genres
                </h4>
                <ul className="grid grid-cols-1 gap-1">
                  {(showAllItems.genres
                    ? availableGenres
                    : availableGenres.slice(0, 15)
                  ).map((genre) => (
                    <li
                      key={genre}
                      className="cursor-pointer text-sm hover:text-rosy truncate py-1"
                      onClick={() => handleAddFilter("genre", genre)}>
                      {genre}
                    </li>
                  ))}
                </ul>
                {availableGenres.length > 15 && !showAllItems.genres && (
                  <div
                    className="mt-2 pt-2 border-t border-ivory/10 text-xs text-ivory/60 cursor-pointer hover:text-rosy flex items-center"
                    onClick={() => handleShowAllItems("genres")}>
                    <span>+{availableGenres.length - 15} plus de genres</span>
                    <ArrowRight size={10} className="ml-1" />
                  </div>
                )}
                {showAllItems.genres && (
                  <div
                    className="mt-2 pt-2 border-t border-ivory/10 text-xs text-ivory/60 cursor-pointer hover:text-rosy flex items-center"
                    onClick={() => handleShowAllItems("genres")}>
                    <span>Afficher moins</span>
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
              className={`text-start cursor-pointer px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${
                filterCategory === "publisher"
                  ? "bg-rosy text-white"
                  : "hover:bg-midnight/50 text-ivory/90"
              }`}
              onClick={() => handleFilterCategory("publisher")}>
              <span>Éditeur</span>
              {hoveredCategory === "publisher" ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            {/* Expanded publisher list */}
            {hoveredCategory === "publisher" && (
              <div className="absolute left-full top-0 ml-2 bg-midnight/90 border border-ivory/20 rounded-md p-3 z-10 w-64 max-h-80 overflow-y-auto shadow-lg backdrop-blur-sm">
                <h4 className="font-medium mb-2 pb-1 border-b border-ivory/20 text-sm">
                  Tous les éditeurs
                </h4>
                <ul className="grid grid-cols-1 gap-1">
                  {(showAllItems.publishers
                    ? availablePublishers
                    : availablePublishers.slice(0, 15)
                  ).map((publisher) => (
                    <li
                      key={publisher}
                      className="cursor-pointer text-sm hover:text-rosy truncate py-1"
                      onClick={() => handleAddFilter("publisher", publisher)}>
                      {publisher}
                    </li>
                  ))}
                </ul>
                {availablePublishers.length > 15 &&
                  !showAllItems.publishers && (
                    <div
                      className="mt-2 pt-2 border-t border-ivory/10 text-xs text-ivory/60 cursor-pointer hover:text-rosy flex items-center"
                      onClick={() => handleShowAllItems("publishers")}>
                      <span>
                        +{availablePublishers.length - 15} plus d'éditeurs
                      </span>
                      <ArrowRight size={10} className="ml-1" />
                    </div>
                  )}
                {showAllItems.publishers && (
                  <div
                    className="mt-2 pt-2 border-t border-ivory/10 text-xs text-ivory/60 cursor-pointer hover:text-rosy flex items-center"
                    onClick={() => handleShowAllItems("publishers")}>
                    <span>Afficher moins</span>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Display search results when search is active */}
      {isSearchActive && filteredGames.length > 0 && (
        <div className="mb-6 bg-midnight/30 p-4 rounded-lg border border-ivory/10">
          <h3 className="font-semibold text-sm mb-2">
            Résultats de la recherche ({filteredGames.length})
          </h3>

          {/* Results are now displayed in the main AllGames component */}
        </div>
      )}

      {isSearchActive &&
        filteredGames.length === 0 &&
        searchQuery.trim() !== "" && (
          <div className="bg-midnight/30 p-4 rounded-lg text-ivory/80 text-sm mb-6">
            Aucun résultat trouvé pour "{searchQuery}"
          </div>
        )}
    </div>
  );
}
