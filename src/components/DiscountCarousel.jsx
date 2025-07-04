"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameSkeleton } from "./placeholder/GameSkeleton";
import { useCarousel } from "@/lib/hooks/useCarousel";
import GameCard from "./GameCard";

{
  /* --------------------------------------------------------------------|
    --------------------------- DiscountCarousel ---------------------------|
  */
}
export default function DiscountCarousel() {
  const {
    currentHighlight,
    highlights,
    loading,
    currentGame,
    nextGame,
    prevGame,
    handleNext,
    handlePrev,
    handleGoTo,
  } = useCarousel();

  return (
    <>
      {/* --------------------------------------------------------------------|
        --------------------------- Discounts -----------------------------|
      */}
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="px-4 md:px-8 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Promotions
          </h2>

          {/* --------------------------------------------------------------------|
            --------------------- Mobile Layout - Vertical Stack----------------|
          */}
          <div className="relative">
            {/* --------------------------------------------------------------------|
              --------------------- Next Element (Top) ---------------------------|
            */}
            <div className="block md:hidden space-y-4">
              <div className="w-full">
                <div
                  className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}

                  <div className="absolute top-2 left-2 text-xs text-slate-400">
                    Next
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Main Content (Center) ------------------------|
              */}
              <div className="w-full">
                <div className="bg-slate-800 rounded-lg p-4 relative overflow-hidden border-2 border-yellow-400/30">
                  {loading ? (
                    <GameSkeleton
                      size="default"
                      className="bg-slate-800 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={currentGame}
                      size="default"
                      className="bg-slate-800 rounded-lg"
                      showDiscount={true}
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Previous Element (Bottom) --------------------|
              */}
              <div className="w-full">
                <div
                  className="bg-slate-800/70 rounded-lg p-3 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}
                  <div className="absolute top-2 left-2 text-xs text-slate-400">
                    Previous
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                --------------------- Mobile Navigation Arrows ---------------------|
              */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={loading}
                  className={`text-white p-3 rounded-full transition-colors duration-200 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-black/50 hover:bg-black/70"
                  }`}>
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
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

            {/* --------------------------------------------------------------------|
              ------------ Desktop Layout - Positioned Elements ------------------|
            */}
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
                      game={currentGame}
                      size="large"
                      className="bg-slate-800 rounded-lg"
                      showDiscount={true}
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Previous Element (Bottom Left) -----------------|
            */}
              <div className="absolute bottom-12 left-0 z-5 w-64 lg:w-80">
                <div
                  className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                  onClick={handlePrev}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={prevGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Next Element (Top Right) -----------------------|
            */}
              <div className="absolute top-12 right-0 z-5 w-64 lg:w-80">
                <div
                  className="bg-slate-800/70 rounded-lg p-4 h-40 lg:h-62 relative overflow-hidden cursor-pointer hover:bg-slate-800/90 transition-all duration-300 transform hover:scale-105"
                  onClick={handleNext}>
                  {loading ? (
                    <GameSkeleton
                      size="medium"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  ) : (
                    <GameCard
                      game={nextGame}
                      size="small"
                      className="bg-slate-800/70 rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------|
                  ----------------- Desktop Navigation Arrows ----------------------|
            */}
              <button
                onClick={handlePrev}
                disabled={loading}
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
                  loading
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-200 z-20 ${
                  loading
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-black/50 hover:bg-black/70"
                }`}>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* --------------------------------------------------------------------|
                -------------------------- Dots Indicator -------------------------|
            */}
            <div className="flex justify-center mt-6 space-x-2">
              {loading
                ? // Skeleton dots while loading
                  Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full bg-slate-600 animate-pulse"
                    />
                  ))
                : highlights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleGoTo(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentHighlight
                          ? "bg-yellow-400"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
            </div>
          </div>

          {/* --------------------------------------------------------------------|
            ----------------- Loading Indicator --------------------------------|
          */}
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
    </>
  );
}
