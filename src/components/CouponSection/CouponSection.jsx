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
    <div className="relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rosy/20 via-plum/30 to-moss/20 opacity-80"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-rosy rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-plum rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-moss rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative bg-midnight/80 backdrop-blur-md rounded-2xl border border-ivory/20 shadow-2xl">
        {/* Header Section */}
        <div className="p-8 border-b border-ivory/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-rosy to-plum p-4 rounded-2xl shadow-lg">
                  <Gift className="text-white" size={32} />
                </div>
                {isQualified && (
                  <div className="absolute -top-2 -right-2 bg-moss rounded-full p-1 shadow-lg">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-ivory mb-2 flex items-center gap-2">
                  Offre spéciale
                  <Sparkles className="text-amber-400" size={24} />
                </h3>
                <p className="text-ivory/80 text-lg">
                  Achetez 5 jeux et obtenez le moins cher{" "}
                  <span className="font-bold text-moss">GRATUIT</span>
                </p>
              </div>
            </div>

            {/* Discount Badge */}
            {isQualified && (
              <div className="bg-gradient-to-r from-moss to-pine px-6 py-3 rounded-xl shadow-lg border border-moss/30">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">ÉCONOMISEZ</div>
                  <div className="text-white/90 text-sm">
                    {couponInfo.cheapestGame?.price}€
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Progress Visualization */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-ivory/80 font-medium">
                  Progression vers l'offre
                </span>
                <span className="text-ivory font-bold">
                  {cartItems.length}/5 jeux
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-midnight/60 rounded-full h-4 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      isQualified
                        ? "bg-gradient-to-r from-moss to-pine"
                        : "bg-gradient-to-r from-rosy to-plum"
                    }`}
                    style={{ width: `${progressPercentage}%` }}>
                    {isQualified && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="text-white" size={12} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mt-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        cartItems.length >= step
                          ? "bg-moss text-white shadow-lg"
                          : "bg-midnight/60 text-ivory/60 border border-ivory/20"
                      }`}>
                      {cartItems.length >= step ? (
                        <CheckCircle size={16} />
                      ) : (
                        step
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="w-full lg:w-80 shrink-0">
              <div
                className={`p-6 rounded-2xl border shadow-lg transition-all duration-500 ${
                  isQualified
                    ? "bg-gradient-to-br from-moss/20 to-pine/30 border-moss/30"
                    : "bg-midnight/60 border-ivory/20"
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isQualified ? "bg-moss/20" : "bg-rosy/20"
                    }`}>
                    {isQualified ? (
                      <CheckCircle className="text-moss" size={24} />
                    ) : (
                      <TrendingUp className="text-rosy" size={24} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`font-bold text-lg ${
                        isQualified ? "text-moss" : "text-ivory"
                      }`}>
                      {isQualified ? "Coupon Activé!" : "Presque là!"}
                    </h4>
                    <p className="text-ivory/70 text-sm">
                      {isQualified
                        ? "Réduction appliquée"
                        : "Continuez vos achats"}
                    </p>
                  </div>
                </div>

                {isQualified ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-midnight/40 rounded-lg">
                      <span className="text-ivory/80">Jeu gratuit:</span>
                      <span className="font-bold text-moss">
                        {couponInfo.cheapestGame?.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-midnight/40 rounded-lg">
                      <span className="text-ivory/80">Économies:</span>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-ivory/50 text-sm">
                          {couponInfo.cheapestGame?.price}€
                        </span>
                        <span className="bg-moss/20 text-moss font-bold px-2 py-1 rounded text-sm">
                          GRATUIT
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-ivory mb-1">
                        {remaining}
                      </div>
                      <div className="text-ivory/70 text-sm">
                        jeu{remaining > 1 ? "x" : ""} restant
                        {remaining > 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="bg-midnight/40 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 text-ivory/60">
                        <ShoppingBag size={16} />
                        <span className="text-sm">
                          Ajoutez {remaining} jeu{remaining > 1 ? "x" : ""} pour
                          débloquer
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with additional info */}
        <div className="px-8 py-6 bg-midnight/40 border-t border-ivory/10">
          <div className="flex items-center justify-between text-sm text-ivory/60">
            <div className="flex items-center gap-2">
              <Ticket size={16} />
              <span>Offre valable sur tous les jeux</span>
            </div>
            <div className="flex items-center gap-4">
              <span>•</span>
              <span>Réduction appliquée automatiquement</span>
              <span>•</span>
              <span>Pas de code requis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
