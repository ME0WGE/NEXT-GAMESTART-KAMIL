"use client";

import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import AllGames from "../AllGames/AllGames";
import CouponSection from "../CouponSection/CouponSection";
import { setFilterCategory } from "@/lib/features/searchSlice";

export default function FilterSideBar() {
  const dispatch = useDispatch();
  const { searchQuery, filterCategory, filteredGames, isSearchActive } =
    useSelector((state) => state.search);

  const handleFilterCategory = (category) => {
    dispatch(setFilterCategory(category));
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
          <li
            className={`text-start cursor-pointer px-3 py-1 rounded ${
              filterCategory === "genre"
                ? "bg-rosy text-white"
                : "hover:bg-midnight/50"
            }`}
            onClick={() => handleFilterCategory("genre")}>
            Genre
          </li>
          <li
            className={`text-start cursor-pointer px-3 py-1 rounded ${
              filterCategory === "publisher"
                ? "bg-rosy text-white"
                : "hover:bg-midnight/50"
            }`}
            onClick={() => handleFilterCategory("publisher")}>
            Publisher
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
