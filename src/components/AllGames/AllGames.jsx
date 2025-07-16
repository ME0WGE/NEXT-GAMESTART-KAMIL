"use client";

import { useAllGames } from "@/lib/hooks/useAllGames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/features/gameDetailsSlice";
import { ShoppingCart, Trash2, Star, Clock } from "lucide-react";
import Link from "next/link";

export default function AllGames() {
  const [displayCount, setDisplayCount] = useState(12);
  const { loading, error, randomPriceOfAllGames } = useAllGames();
  const dispatch = useDispatch();
  const { addingToCart, cartItems } = useSelector((state) => state.gameDetails);
  const { isSearchActive, filteredGames } = useSelector(
    (state) => state.search
  );
  const [addingGameId, setAddingGameId] = useState(null);
  const [removingGameId, setRemovingGameId] = useState(null);

  const initialGamesCount = 12;
  const batchSize = 12;

  // Use filtered games when search is active, otherwise use all games
  const gamesToDisplay = isSearchActive
    ? filteredGames?.slice(0, displayCount)
    : randomPriceOfAllGames?.slice(0, displayCount) || [];

  // Check if a game is in the cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Handle add to cart
  const handleAddToCart = async (game, e) => {
    try {
      e.preventDefault();
      setAddingGameId(game.id);
      // Add price if not present
      const gameWithPrice = {
        ...game,
        price: game.price || `${Math.floor(Math.random() * 96) + 5}.99`,
      };
      await dispatch(addToCart(gameWithPrice)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingGameId(null);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = async (gameId, e) => {
    try {
      e.preventDefault();
      setRemovingGameId(gameId);
      await dispatch(removeFromCart(gameId)).unwrap();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setRemovingGameId(null);
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + batchSize);
  };

  const handleShowLess = () => {
    setDisplayCount(initialGamesCount);
  };

  // Random rating generator for demonstration
  const getRandomRating = () => {
    return (Math.floor(Math.random() * 50) + 50) / 10; // Generate between 5.0 and 10.0
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-midnight/50 rounded-md mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-midnight/30 rounded-lg h-64 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">
          Failed to load games. Please try again later.
        </p>
      </div>
    );
  }

  if (gamesToDisplay.length === 0 && isSearchActive) {
    return (
      <div className="text-center py-12">
        <p className="text-ivory/70">
          No games found matching your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isSearchActive && (
        <h2 className="text-xl font-semibold mb-6 text-ivory border-b border-ivory/20 pb-3">
          Search Results ({filteredGames.length})
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamesToDisplay.map((game) => (
          <Link href={`/games/${game.id}`} key={game.id} className="group">
            <div className="bg-midnight/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rosy/10 border border-ivory/10 hover:border-rosy/30 flex flex-col h-full">
              <div className="relative">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full aspect-video object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-ivory group-hover:text-rosy transition-colors duration-300 line-clamp-2">
                    {game.title}
                  </h3>
                  <div className="flex items-center bg-midnight/70 px-2 py-1 rounded-md">
                    <Star size={14} className="text-rosy mr-1 fill-rosy" />
                    <span className="text-xs font-medium">
                      {getRandomRating().toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-ivory/60 mb-4">
                  <span className="bg-plum/20 rounded px-2 py-1">
                    {game.genre}
                  </span>
                  <span className="mx-2">•</span>
                  <Clock size={12} className="mr-1" />
                  <span>{Math.floor(Math.random() * 100) + 2}h</span>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2">
                  <div className="font-bold text-lg text-ivory">
                    ${game.price?.toString().replace(",", ".") || "29.99"}
                  </div>

                  {isInCart(game.id) ? (
                    <button
                      onClick={(e) => handleRemoveFromCart(game.id, e)}
                      disabled={removingGameId === game.id}
                      className="bg-red-500/80 hover:bg-red-600 text-ivory text-sm px-3 py-2 rounded-md transition-colors duration-300 flex items-center gap-1 disabled:opacity-50">
                      {removingGameId === game.id ? (
                        "..."
                      ) : (
                        <>
                          <Trash2 size={14} /> Remove
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(game, e)}
                      disabled={addingToCart || addingGameId === game.id}
                      className="bg-pine hover:bg-moss text-ivory text-sm px-3 py-2 rounded-md transition-colors duration-300 flex items-center gap-1 disabled:opacity-50">
                      {addingGameId === game.id ? (
                        "..."
                      ) : (
                        <>
                          <ShoppingCart size={14} /> Add to cart
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        {(isSearchActive ? filteredGames : randomPriceOfAllGames)?.length >
          displayCount && (
          <button
            onClick={handleShowMore}
            className="bg-rosy hover:bg-plum text-ivory px-5 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
            Show More
          </button>
        )}

        {displayCount > initialGamesCount && (
          <button
            onClick={handleShowLess}
            className="bg-midnight hover:bg-midnight/80 text-ivory border border-ivory/20 px-5 py-2 rounded-lg transition-colors duration-300">
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
