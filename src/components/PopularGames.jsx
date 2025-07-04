"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
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

  return (
    <>
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Header of the section */}
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-yellow-400" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
              Les plus joués du moment
            </h2>
          </div>

          {/* Grid of games */}
          {loading || error ? (
            // Loading skeleton (affiché aussi en cas d'erreur)
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {displayedGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-all duration-300 cursor-pointer group">
                    {/* Game image */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Overlay dark */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Game information */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white mb-2 truncate">
                        {game.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium">
                          {game.genre}
                        </span>
                        <span>{game.platform}</span>
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
