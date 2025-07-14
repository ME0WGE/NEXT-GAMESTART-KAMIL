"use client";

import { useAllGames } from "@/lib/hooks/useAllGames";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Keep the input focused as long as there's at least 1 char
  useEffect(() => {
    search === "" ? setIsFocused(false) : setIsFocused(true);
  }, [search]);

  const handleChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  const handleSearch = () => {};
  // ------------
  const [showAll, setShowAll] = useState(false);
  const { loading, allGames, error } = useAllGames();

  const gamesPerRow = 1;
  const initialGamesCount = 10 * gamesPerRow;
  const displayedGames = showAll
    ? allGames
    : allGames.slice(0, initialGamesCount);
  const handleAddToCart = (game) => {
    console.log("Ajout au panier:", game.title);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
          className={
            isFocused
              ? "bg-midnight text-ivory px-4 py-1 rounded-b-2xl rounded-t-lg focus:outline-none ring-2 ring-rosy/70"
              : "focus:outline-none bg-midnight text-ivory px-4 py-1 rounded-b-2xl rounded-t-lg "
          }
        />
        <button className="bg-rosy text-ivory inline-block px-4 py-1 rounded-b-lg rounded-t-lg hover:bg-pine transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rosy/70">
          Search
        </button>
      </div>
      <div>
        {displayedGames.map((game) => (
          <div key={game.id}>
            <div>
              <img src={game.thumbnail} alt={game.title} />
              {game.title}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * Features:
 * 1. SearchBar: Search by title
 * 2. SearchBar: Search by category
 * 3. SearchBar: Search by publisher
 * LocalStorage
 */
