"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBudgetGames } from "@/lib/hooks/useBudgetGames";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/gameDetailsSlice";
import { ShoppingCart, Eye } from "lucide-react";
import GamePrice from "@/components/GamePrice";

export default function BudgetGames() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { budgetGames, loading, error, loadBudgetGames } = useBudgetGames();
  const { cartItems } = useSelector((state) => state.gameDetails);
  const [addingGameId, setAddingGameId] = useState(null);

  // Check if a game is in the cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Handle add to cart
  const handleAddToCart = async (e, game) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setAddingGameId(game.id);
      await dispatch(addToCart(game)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingGameId(null);
    }
  };

  // Handle view details
  const handleViewDetails = (e, gameId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/games/${gameId}`);
  };

  // Render game cards
  const renderGameCards = () => {
    if (loading) {
      return Array(8)
        .fill(0)
        .map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-slate-800/70 rounded-xl p-4 shadow-md animate-pulse h-[320px]"
            aria-hidden="true">
            <div className="w-full h-40 bg-slate-700 rounded-lg mb-4"></div>
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-10 bg-slate-700 rounded w-1/2"></div>
              <div className="h-10 bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-8 text-red-400">
          <p>Erreur lors du chargement des jeux. Veuillez réessayer.</p>
          <button
            onClick={() => loadBudgetGames()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Réessayer
          </button>
        </div>
      );
    }

    if (!budgetGames || budgetGames.length === 0) {
      return (
        <div className="col-span-full text-center py-8 text-slate-400">
          <p>Aucun jeu trouvé.</p>
        </div>
      );
    }

    return budgetGames.map((game) => (
      <div
        key={game.id}
        className="bg-slate-800/80 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:shadow-yellow-400/10 hover:border-yellow-400/30 transition-all group"
        role="article">
        {/* Game thumbnail */}
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={`${game.title} thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>

        {/* Game info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
            {game.title}
          </h3>

          {/* Price display */}
          <div className="mb-4">
            <GamePrice
              game={game}
              showDiscountBadge={true}
              className="text-white"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => handleAddToCart(e, game)}
              disabled={addingGameId === game.id || isInCart(game.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isInCart(game.id)
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium"
              }`}
              aria-label={
                isInCart(game.id) ? "Déjà dans le panier" : "Ajouter au panier"
              }>
              <ShoppingCart size={18} />
              <span className="text-sm">
                {isInCart(game.id) ? "Dans le panier" : "Ajouter"}
              </span>
            </button>

            <button
              onClick={(e) => handleViewDetails(e, game.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              aria-label="Voir les détails">
              <Eye size={18} />
              <span className="text-sm">Détails</span>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent inline-flex items-end">
            Moins de 10€
            <span className="ml-2 text-sm text-slate-400 hidden sm:inline-block">
              Jeux à petits prix
            </span>
          </h2>
        </div>

        {/* Games grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          role="region"
          aria-label="Jeux à moins de 10€">
          {renderGameCards()}
        </div>
      </div>
    </section>
  );
}
