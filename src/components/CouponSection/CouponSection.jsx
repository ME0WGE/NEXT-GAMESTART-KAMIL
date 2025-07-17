"use client";

import React from "react";
import {
  Ticket,
  ShoppingBag,
  Gift,
  Sparkles,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { calculateCouponDiscount } from "@/lib/features/couponSlice";

export default function CouponSection() {
  const { cartItems } = useSelector((state) => state.gameDetails);

  // Calculate coupon discount - returns { isApplicable, cheapestGame, discountAmount }
  const couponInfo = calculateCouponDiscount(cartItems);

  const progressPercentage = Math.min((cartItems.length / 5) * 100, 100);
  const isQualified = cartItems.length >= 5;
  const remaining = Math.max(5 - cartItems.length, 0);

  return (
    <section className="bg-gradient-to-b from-midnight to-midnight/90 circuit-pattern py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden max-w-lg mx-auto">
          {/* Compact background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 -left-20 w-40 h-40 bg-rosy rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-moss rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative bg-midnight/80 backdrop-blur-md rounded-xl border border-ivory/20 shadow-lg">
            {/* Compact Header */}
            <div className="p-4 border-b border-ivory/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-gradient-to-br from-rosy to-plum p-3 rounded-xl shadow-md">
                    <Gift className="text-white" size={20} />
                  </div>
                  {isQualified && (
                    <div className="absolute -top-1 -right-1 bg-moss rounded-full p-0.5 shadow-md">
                      <CheckCircle className="text-white" size={12} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-ivory flex items-center gap-2">
                    Offre spéciale
                    <Sparkles className="text-amber-400" size={16} />
                  </h3>
                  <p className="text-ivory/80 text-sm">
                    5 jeux = 1{" "}
                    <span className="font-bold text-moss">GRATUIT</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Progress Section */}
            <div className="p-4 space-y-4">
              {/* Progress Info */}
              <div className="flex items-center justify-between">
                <span className="text-ivory/80 text-sm font-medium">
                  Progression
                </span>
                <span className="text-ivory font-bold text-sm">
                  {cartItems.length}/5
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-midnight/60 rounded-full h-3 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      isQualified
                        ? "bg-gradient-to-r from-moss to-pine"
                        : "bg-gradient-to-r from-rosy to-plum"
                    }`}
                    style={{ width: `${progressPercentage}%` }}>
                    {isQualified && (
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="text-white" size={10} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Steps - Compact */}
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      cartItems.length >= step
                        ? "bg-moss text-white shadow-md"
                        : "bg-midnight/60 text-ivory/60 border border-ivory/20"
                    }`}>
                    {cartItems.length >= step ? (
                      <CheckCircle size={12} />
                    ) : (
                      step
                    )}
                  </div>
                ))}
              </div>

              {/* Status Section */}
              <div
                className={`p-4 rounded-lg border transition-all duration-500 ${
                  isQualified
                    ? "bg-gradient-to-br from-moss/20 to-pine/30 border-moss/30"
                    : "bg-midnight/40 border-ivory/20"
                }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isQualified ? "bg-moss/20" : "bg-rosy/20"
                    }`}>
                    {isQualified ? (
                      <CheckCircle className="text-moss" size={16} />
                    ) : (
                      <TrendingUp className="text-rosy" size={16} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`font-bold text-sm ${
                        isQualified ? "text-moss" : "text-ivory"
                      }`}>
                      {isQualified ? "Coupon Activé!" : "Presque là!"}
                    </h4>
                    <p className="text-ivory/70 text-xs">
                      {isQualified
                        ? "Réduction appliquée"
                        : `${remaining} jeu${remaining > 1 ? "x" : ""} restant${
                            remaining > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>

                {isQualified ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-midnight/40 rounded text-xs">
                      <span className="text-ivory/80">Jeu gratuit:</span>
                      <span className="font-bold text-moss truncate ml-2 max-w-[120px]">
                        {couponInfo.cheapestGame?.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-midnight/40 rounded text-xs">
                      <span className="text-ivory/80">Économies:</span>
                      <div className="flex items-center gap-1">
                        <span className="line-through text-ivory/50">
                          {couponInfo.cheapestGame?.price}€
                        </span>
                        <span className="bg-moss/20 text-moss font-bold px-1 py-0.5 rounded text-xs">
                          GRATUIT
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-midnight/40 rounded-lg p-3">
                      <div className="flex items-center justify-center gap-2 text-ivory/60">
                        <ShoppingBag size={14} />
                        <span className="text-xs">
                          Ajoutez {remaining} jeu{remaining > 1 ? "x" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Compact Footer */}
            <div className="px-4 py-3 bg-midnight/40 border-t border-ivory/10">
              <div className="flex flex-col gap-2 text-xs text-ivory/60">
                <div className="flex items-center gap-2">
                  <Ticket size={12} />
                  <span>Offre valable sur tous les jeux</span>
                </div>
                <div className="text-center">
                  <span>Réduction automatique • Pas de code requis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
