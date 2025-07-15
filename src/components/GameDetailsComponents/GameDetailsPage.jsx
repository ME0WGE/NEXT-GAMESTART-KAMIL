"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "@/lib/features/gameDetailsSlice";
import GameTitle from "./GameTitle";
import GameImage from "./GameImage";
import VideoPlayer from "./VideoPlayer";
import GameDescription from "./GameDescription";
import PriceDisplay from "./PriceDisplay";
import AddToCartButton from "./AddToCartButton";

export default function GameDetailsPage({ gameId }) {
  const dispatch = useDispatch();
  const { currentGame, loading, error } = useSelector(
    (state) => state.gameDetails
  );

  useEffect(() => {
    // Only fetch game details initially
    dispatch(fetchGameDetails(gameId));
  }, [dispatch, gameId]);

  if (loading) {
    return <div className="container mx-auto p-4 text-ivory">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error Loading Game</h2>
        <p>{error}</p>
        <p className="mt-4">Please try again later.</p>
      </div>
    );
  }

  if (!currentGame) {
    return (
      <div className="container mx-auto p-4 text-ivory">Game not found</div>
    );
  }

  return (
    <>
      <div className="p-70 pt-35 bg-midnight text-ivory h-screen">
        <GameTitle gameId={gameId} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GameImage gameId={gameId} />
          <VideoPlayer gameId={gameId} />
        </div>
        <GameDescription gameId={gameId} />
        <div className="flex justify-between items-center mt-6">
          <PriceDisplay gameId={gameId} />
          <AddToCartButton gameId={gameId} />
        </div>
      </div>
    </>
  );
}
