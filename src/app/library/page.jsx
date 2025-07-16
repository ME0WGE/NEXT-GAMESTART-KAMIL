"use client";

import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Login from "@/components/Login";
import { useState, useEffect } from "react";

export default function Library() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data: session } = useSession();
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Check if user is authenticated with either Redux or NextAuth
  const isAuthenticated = user.isConnected || !!session;

  // If not logged in, show login component
  if (!isAuthenticated) {
    return <Login />;
  }

  // Show loading state if data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center pt-16">
        <div className="animate-pulse text-xl">Loading library...</div>
      </div>
    );
  }

  return (
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
              Your library is empty
            </h2>
            <p className="text-neutral-400 mb-4">
              You haven't purchased any games yet.
            </p>
            <Link
              href="/games"
              className="inline-block px-6 py-3 bg-pine text-white rounded-md hover:bg-pine/90 transition">
              Browse Games
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <Link
                href={`/games/${game.id}`}
                key={game.id}
                className="game-card bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <img
                    src={
                      game.image ||
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
                      Owned
                    </span>
                    <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded text-sm">
                      Play
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
