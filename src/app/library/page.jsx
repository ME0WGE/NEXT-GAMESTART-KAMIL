"use client";

import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { Download, Play } from "lucide-react";

export default function Library() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data: session } = useSession();
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingGames, setDownloadingGames] = useState(new Set());

  const purchasedGames = user.purchasedGames || [];

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGames(purchasedGames);
    } else {
      setFilteredGames(
        purchasedGames.filter((game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, purchasedGames]);

  // Function to handle fake download
  const handlePlayGame = async (game, e) => {
    e.preventDefault(); // Prevent navigation to game details
    e.stopPropagation();

    const gameId = game.id;

    // Add game to downloading set
    setDownloadingGames((prev) => new Set(prev).add(gameId));

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create fake download
      const fileName = `${game.title.replace(/[^a-zA-Z0-9]/g, "")}.exe`;
      const fakeContent = `This is a fake executable file for ${
        game.title
      }.\n\nThis is just a demo - no actual game will be downloaded.\n\nGame ID: ${
        game.id
      }\nTitle: ${game.title}\nGenre: ${game.genre || "Unknown"}\nPlatform: ${
        game.platform || "PC"
      }`;

      // Create blob and download
      const blob = new Blob([fakeContent], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      // Remove game from downloading set
      setDownloadingGames((prev) => {
        const newSet = new Set(prev);
        newSet.delete(gameId);
        return newSet;
      });
    }
  };

  // Show loading state if data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center pt-16">
        <div className="animate-pulse text-xl">Loading library...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute redirectTo="/library">
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">Your Game Library</h1>

          {/* Search and filters */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search your games..."
              className="w-full md:w-1/2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pine"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Game library grid */}
          {purchasedGames.length === 0 ? (
            <div className="bg-neutral-800 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Votre bibliothèque est vide
              </h2>
              <p className="text-neutral-400 mb-4">
                Vous n'avez pas encore acheté de jeux.
              </p>
              <Link
                href="/games"
                className="inline-block px-6 py-3 bg-pine text-white rounded-md hover:bg-pine/90 transition">
                Parcourir les jeux
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => {
                const isDownloading = downloadingGames.has(game.id);

                return (
                  <div
                    key={game.id}
                    className="game-card bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
                    <Link href={`/games/${game.id}`} className="block">
                      <div className="relative h-48 w-full">
                        <img
                          src={
                            game.thumbnail ||
                            "https://via.placeholder.com/300x180?text=Game+Image"
                          }
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-white mb-1">
                          {game.title}
                        </h2>
                        <div className="flex justify-between items-center">
                          <span className="text-sm bg-pine/90 text-white px-2 py-1 rounded">
                            Acheté
                          </span>
                          <button
                            onClick={(e) => handlePlayGame(game, e)}
                            disabled={isDownloading}
                            className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors ${
                              isDownloading
                                ? "bg-neutral-600 text-neutral-400 cursor-not-allowed"
                                : "bg-neutral-700 hover:bg-neutral-600 text-white"
                            }`}>
                            {isDownloading ? (
                              <>
                                <Download className="w-3 h-3 animate-spin" />
                                <span>Téléchargement...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3" />
                                <span>Jouer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
