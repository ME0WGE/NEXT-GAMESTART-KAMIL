"use client";

import { useState } from "react";
import { TrendingUp, ShoppingCart, Trash2, View } from "lucide-react";
import { useMostPlayedGames } from "@/lib/hooks/useMostPlayedGames";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/features/gameDetailsSlice";
import GamePrice from "@/components/GamePrice";
import Link from "next/link";

export default function PopularGames() {
  const [showAll, setShowAll] = useState(false);
  const { loading, mostPlayedGames, error } = useMostPlayedGames();
  const dispatch = useDispatch();
  const { addingToCart, cartItems } = useSelector((state) => state.gameDetails);
  const [addingGameId, setAddingGameId] = useState(null);
  const [removingGameId, setRemovingGameId] = useState(null);

  {
    /* --------------------------------------------------------------------|
      --------------------------- Popular Games ---------------------------|
    */
  }

  // Number of games per row
  const gamesPerRow = 4;
  // Number of games to display initially
  const initialGamesCount = 2 * gamesPerRow;
  // Games to display
  const displayedGames = showAll
    ? mostPlayedGames
    : mostPlayedGames.slice(0, initialGamesCount);
  // Check if there are more games to display
  const hasMoreGames = mostPlayedGames.length > initialGamesCount;

  // Check if a game is in the cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Handle add to cart
  const handleAddToCart = async (game, e) => {
    try {
      e.stopPropagation();
      setAddingGameId(game.id);
      // Use game as is - prices are handled consistently
      await dispatch(addToCart(game)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingGameId(null);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = async (gameId, e) => {
    try {
      e.stopPropagation();
      setRemovingGameId(gameId);
      await dispatch(removeFromCart(gameId)).unwrap();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setRemovingGameId(null);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-midnight to-midnight/90 circuit-pattern text-ivory py-12">
        <div className="container mx-auto relative px-4 md:px-8">
          {/* Header of the section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-rosy/10 p-3 rounded-full">
              <TrendingUp className="text-rosy" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ivory">
              Les plus joués du moment
            </h2>
          </div>

          {/* Grid of games */}
          {loading || error ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-midnight/60 backdrop-blur-sm rounded-xl h-48 animate-pulse border border-plum/10">
                  <div className="w-full h-32 bg-midnight/80 rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-midnight/80 rounded mb-2"></div>
                    <div className="h-3 bg-midnight/80 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-400">
                {displayedGames.map((game) => (
                  <div
                    key={game.id}
                    className="relative bg-midnight/60 backdrop-blur-sm overflow-hidden h-50 w-90 hover:bg-slate-700 hover:scale-105 transition-all duration-100 cursor-pointer group rounded-xl border border-plum/20 hover:shadow-rosy/20 hover:border-rosy/40">
                    {/* Game image - takes full space */}
                    <div className="relative w-full h-full">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Video overlay - appears on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-opacity duration-0">
                        <video
                          src={`https://www.freetogame.com//g/${game.id}/videoplayback.webm`}
                          className="w-full h-full object-contain rounded-lg"
                          autoPlay
                          muted
                          loop
                          onError={(e) => {
                            // Fallback to thumbnail if video fails to load
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Overlay with game information - slides up from bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-lg text-ivory mb-2 truncate">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-ivory/70 mb-3">
                            <span className="bg-plum/80 px-2 py-1 rounded text-xs font-medium text-ivory">
                              {game.genre}
                            </span>
                            <span className="text-ivory/70">
                              {game.platform}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            {isInCart(game.id) ? (
                              ""
                            ) : (
                              <Link href={`/games/${game.id}`}>
                                <button className="w-full bg-rosy hover:bg-rosy/90 text-midnight font-bold py-2 px-2 rounded-lg transition-all duration-200 hover:scale-103 hover:text-ivory shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                  <span>Voir plus</span>
                                </button>
                              </Link>
                            )}
                            {/* Add to Cart Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(game, e);
                              }}
                              disabled={
                                addingToCart ||
                                addingGameId === game.id ||
                                isInCart(game.id)
                              }
                              className="not-disabled:w-3/4 w-3/4 bg-rosy hover:bg-rosy/90 text-midnight font-bold py-2 px-3 rounded-lg transition-all duration-200 not-disabled:hover:scale-103 hover:text-ivory shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                              <ShoppingCart size={16} />
                              {addingGameId === game.id
                                ? "Patientez..."
                                : isInCart(game.id)
                                ? "Dans le panier"
                                : "Ajouter au panier"}
                            </button>

                            {/* Remove from Cart Button */}
                            {isInCart(game.id) && (
                              <button
                                onClick={(e) =>
                                  handleRemoveFromCart(game.id, e)
                                }
                                disabled={removingGameId === game.id}
                                className="w-1/4 bg-red-400 hover:bg-red-500 text-slate font-bold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-103 hover:text-ivory shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* "Show more" button */}
              {hasMoreGames && (
                <div className="text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className={
                      showAll
                        ? "bg-rosy hover:bg-plum text-ivory font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-103 hover:rounded-t-3xl cursor-pointer shadow-lg"
                        : "bg-rosy hover:bg-plum text-ivory font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-103 hover:rounded-b-3xl cursor-pointer shadow-lg"
                    }>
                    {showAll
                      ? "Afficher moins"
                      : `Afficher plus (${
                          mostPlayedGames.length - initialGamesCount
                        } autres)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
