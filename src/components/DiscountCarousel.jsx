"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Composant Skeleton pour les éléments de chargement
const GameSkeleton = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: {
      container: "h-32",
      circle: "w-8 h-8",
      rect1: "w-6 h-6",
      rect2: "w-10 h-6",
    },
    default: {
      container: "h-64",
      circle: "w-16 h-16",
      rect1: "w-12 h-12",
      rect2: "w-20 h-12",
    },
    medium: {
      container: "h-53",
      circle: "w-8 h-8",
      rect1: "w-6 h-6",
      rect2: "w-10 h-6",
    },
    large: {
      container: "h-96 lg:h-[450px]",
      circle: "w-24 h-24",
      rect1: "w-20 h-20",
      rect2: "w-28 h-20",
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`${className} ${sizes.container} relative overflow-hidden`}>
      <div className="absolute inset-3 bg-slate-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div
            className={`${sizes.circle} bg-slate-600 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse`}></div>
          <div
            className={`${sizes.rect1} bg-slate-600 rounded mx-auto mb-2 animate-pulse`}></div>
          <div
            className={`${sizes.rect2} bg-slate-600 rounded mx-auto animate-pulse`}></div>
        </div>
      </div>
    </div>
  );
};

// Composant pour afficher un jeu avec image réelle
const GameCard = ({
  game,
  className = "",
  size = "default",
  showDiscount = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: "h-32",
    default: "h-64",
    large: "h-96 lg:h-[450px]",
  };

  return (
    <div
      className={`${className} ${sizeClasses[size]} relative overflow-hidden`}>
      {!imageLoaded && !imageError && (
        <GameSkeleton size={size} className="absolute inset-0" />
      )}

      {imageError && <GameSkeleton size={size} className="absolute inset-0" />}

      <img
        src={game.image}
        alt={game.title}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />

      {showDiscount && game.discount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
          {game.discount}
        </div>
      )}

      {imageLoaded && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{game.title}</h3>
        </div>
      )}
    </div>
  );
};

export default function DiscountCarousel() {
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulation d'un appel API
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Données fictives qui arriveraient de l'API
      const apiData = [
        {
          id: 1,
          title: "Cyberpunk 2077",
          image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
          discount: "50%",
        },
        {
          id: 2,
          title: "The Witcher 3",
          image:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
          discount: "30%",
        },
        {
          id: 3,
          title: "Red Dead Redemption 2",
          image:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop",
          discount: "25%",
        },
        {
          id: 4,
          title: "GTA V",
          image:
            "https://images.unsplash.com/photo-1556438064-2d7646166914?w=300&h=200&fit=crop",
          discount: "40%",
        },
      ];

      setHighlights(apiData);
      setLoading(false);
    };

    // fetchGames();
  }, []);

  // Auto-slide pour les highlights
  useEffect(() => {
    if (loading || highlights.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length, loading]);

  const nextHighlight = () => {
    if (loading) return;
    setCurrentHighlight((prev) => (prev + 1) % highlights.length);
  };

  const prevHighlight = () => {
    if (loading) return;
    setCurrentHighlight(
      (prev) => (prev - 1 + highlights.length) % highlights.length
    );
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Highlights Section */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
          Promotions
        </h2>

        <div className="relative">
          {/* Mobile Layout - Vertical Stack */}
          <div className="block md:hidden space-y-4">
            {/* Next Element (Top) */}
            <div className="w-full">
              <div
                className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                onClick={nextHighlight}>
                {loading ? (
                  <GameSkeleton
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={
                      highlights[(currentHighlight + 1) % highlights.length]
                    }
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                )}

                <div className="absolute top-2 left-2 text-xs text-slate-400">
                  Next
                </div>
              </div>
            </div>

            {/* Main Content (Center) */}
            <div className="w-full">
              <div className="bg-slate-800 rounded-lg p-4 relative overflow-hidden border-2 border-yellow-400/30">
                {loading ? (
                  <GameSkeleton
                    size="default"
                    className="bg-slate-800 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={highlights[currentHighlight]}
                    size="default"
                    className="bg-slate-800 rounded-lg"
                    showDiscount={true}
                  />
                )}
              </div>
            </div>

            {/* Previous Element (Bottom) */}
            <div className="w-full">
              <div
                className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                onClick={prevHighlight}>
                {loading ? (
                  <GameSkeleton
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={
                      highlights[
                        (currentHighlight - 1 + highlights.length) %
                          highlights.length
                      ]
                    }
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                )}
                <div className="absolute top-2 left-2 text-xs text-slate-400">
                  Previous
                </div>
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={prevHighlight}
                disabled={loading}
                className={`text-white p-3 rounded-full transition-colors duration-200 ${
                  loading
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextHighlight}
                disabled={loading}
                className={`text-white p-3 rounded-full transition-colors duration-200 ${
                  loading
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Layout - Positioned Elements */}
          <div className="hidden md:block relative h-[500px] lg:h-[600px]">
            {/* Main Content (Center) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-16 lg:px-24">
              <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl relative overflow-hidden border-2 border-yellow-400/30">
                {loading ? (
                  <GameSkeleton
                    size="large"
                    className="bg-slate-800 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={highlights[currentHighlight]}
                    size="large"
                    className="bg-slate-800 rounded-lg"
                    showDiscount={true}
                  />
                )}
              </div>
            </div>

            {/* Previous Element (Bottom Left) */}
            <div className="absolute bottom-12 left-0 z-5 w-64 lg:w-80">
              <div
                className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                onClick={prevHighlight}>
                {loading ? (
                  <GameSkeleton
                    size="medium"
                    className="bg-slate-800/70 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={
                      highlights[
                        (currentHighlight - 1 + highlights.length) %
                          highlights.length
                      ]
                    }
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Next Element (Top Right) */}
            <div className="absolute top-12 right-0 z-5 w-64 lg:w-80">
              <div
                className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                onClick={nextHighlight}>
                {loading ? (
                  <GameSkeleton
                    size="medium"
                    className="bg-slate-800/70 rounded-lg"
                  />
                ) : (
                  <GameCard
                    game={
                      highlights[(currentHighlight + 1) % highlights.length]
                    }
                    size="small"
                    className="bg-slate-800/70 rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              onClick={prevHighlight}
              disabled={loading}
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
                loading
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-black/50 hover:bg-black/70"
              }`}>
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextHighlight}
              disabled={loading}
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
                loading
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-black/50 hover:bg-black/70"
              }`}>
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {loading
              ? // Skeleton dots pendant le chargement
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full bg-slate-600 animate-pulse"
                  />
                ))
              : highlights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHighlight(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentHighlight
                        ? "bg-yellow-400"
                        : "bg-slate-600"
                    }`}
                  />
                ))}
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 text-slate-400">
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting to the Matrix...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
