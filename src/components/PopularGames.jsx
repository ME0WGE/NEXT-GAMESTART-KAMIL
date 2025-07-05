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
      <div className="text-white py-12 relative">
        <div className="container mx-auto relative">
          {/* Header of the section */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <TrendingUp
              className="text-cyan-400 animate-neon-flicker"
              size={32}
            />
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent tracking-wider uppercase neon-text">
              <span className="text-cyan-400">[</span>
              TOP CYBER GAMES
              <span className="text-purple-400">]</span>
            </h2>
          </div>

          {/* Grid of games */}
          {loading || error ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-900/90 backdrop-blur-xl rounded-xl h-48 animate-pulse border border-cyan-500/30">
                  <div className="w-full h-32 bg-slate-800 rounded-t-xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-3 bg-slate-800 rounded w-2/3"></div>
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
                    className="relative bg-slate-900/90 backdrop-blur-xl overflow-hidden h-50 w-90 hover:bg-slate-800/90 hover:scale-105 transition-all duration-300 cursor-pointer group border border-cyan-500/30 hover:border-fuchsia-500/50 rounded-lg">
                    {/* Cyberpunk background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:15px_15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-black text-lg text-cyan-300 mb-2 truncate tracking-wider">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-cyan-200 mb-3">
                            <span className="bg-cyan-600 px-2 py-1 rounded text-xs font-mono tracking-wider">
                              {game.genre}
                            </span>
                            <span className="font-mono">{game.platform}</span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(game);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-900 font-black py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm tracking-wider border border-cyan-300/50">
                            <ShoppingCart size={16} />
                            HACK GAME
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
                    className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-900 font-black py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg border border-cyan-300/50 tracking-wider uppercase">
                    {showAll
                      ? "HIDE MORE"
                      : `LOAD MORE (${
                          mostPlayedGames.length - initialGamesCount
                        } CYBER GAMES)`}
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
