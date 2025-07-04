"use client";

import { useState, useRef } from "react";
import { TrendingUp, ShoppingCart } from "lucide-react";
import { useMostPlayedGames } from "@/lib/hooks/useMostPlayedGames";

export default function PopularGames() {
  const [showAll, setShowAll] = useState(false);
  const { loading, mostPlayedGames, error } = useMostPlayedGames();

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

  // Handle add to cart
  const handleAddToCart = (game) => {
    console.log("Ajout au panier:", game.title);
    // TODO: Implement cart functionality
  };

  return (
    <>
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto relative">
          {/* Header of the section */}
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-yellow-400" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
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
                  className="bg-slate-800 rounded-xl h-48 animate-pulse">
                  <div className="w-full h-32 bg-slate-700 rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
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
                    className="relative bg-slate-800 overflow-hidden h-50 w-90 hover:bg-slate-700 hover:scale-105 transition-all duration-100 cursor-pointer group">
                    {/* Game image - takes full space */}
                    <div className="relative w-full h-full">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Video overlay - appears on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-opacity duration-300">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-lg text-white mb-2 truncate">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                            <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium">
                              {game.genre}
                            </span>
                            <span>{game.platform}</span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(game);
                            }}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm">
                            <ShoppingCart size={16} />
                            Ajouter au panier
                          </button>
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
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
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
