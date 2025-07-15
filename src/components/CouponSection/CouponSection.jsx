"use client";

import React from "react";
import { Ticket, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { calculateCouponDiscount } from "@/lib/features/couponSlice";

export default function CouponSection() {
  const { cartItems } = useSelector((state) => state.gameDetails);

  // Calculate coupon discount - returns { isApplicable, cheapestGame, discountAmount }
  const couponInfo = calculateCouponDiscount(cartItems);

  return (
    <div className="bg-gradient-to-r from-rosy/30 via-plum/30 to-rosy/30 py-8 mt-12 mb-8">
      <div className="container mx-auto px-4">
        <div className="bg-midnight/70 backdrop-blur-md border border-ivory/20 rounded-lg p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <Ticket className="text-pine mr-4" size={40} />
              <div>
                <h3 className="text-xl font-bold text-ivory mb-1">
                  Coupon spécial "4+1 gratuit"
                </h3>
                <p className="text-slate-300 max-w-md">
                  Le jeu le moins cher est offert lors de l'achat de 5 jeux ou
                  plus.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-midnight/60 p-3 rounded-lg border border-ivory/10">
              <ShoppingBag className="text-moss mr-3" size={24} />
              <div>
                <p className="text-ivory text-sm">
                  {cartItems.length < 5 ? (
                    <>
                      <span className="font-bold text-ivory">
                        {5 - cartItems.length} jeux de plus
                      </span>{" "}
                      pour bénéficier du coupon
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-pine">
                        Coupon appliqué!
                      </span>{" "}
                      <span className="line-through text-slate-400 mr-2">
                        {couponInfo.cheapestGame?.price}€
                      </span>
                      <span className="text-moss font-bold">GRATUIT</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
