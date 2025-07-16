"use client";

import React from "react";
import { Ticket, ShoppingBag, Gift } from "lucide-react";
import { useSelector } from "react-redux";
import { calculateCouponDiscount } from "@/lib/features/couponSlice";

export default function CouponSection() {
  const { cartItems } = useSelector((state) => state.gameDetails);

  // Calculate coupon discount - returns { isApplicable, cheapestGame, discountAmount }
  const couponInfo = calculateCouponDiscount(cartItems);

  return (
    <div className="bg-gradient-to-r from-midnight via-midnight/80 to-midnight rounded-xl overflow-hidden shadow-xl">
      <div className="relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10 circuit-pattern"></div>

        <div className="bg-gradient-to-r from-rosy/20 to-plum/30 p-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-ivory">
            <div className="flex items-center">
              <div className="bg-rosy/20 p-3 rounded-full mr-4">
                <Gift className="text-rosy" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Special Offer: Buy 4, Get 1 Free
                </h3>
                <p className="text-ivory/80 max-w-md">
                  Add 5 or more games to your cart and get the cheapest one
                  completely free!
                </p>
              </div>
            </div>

            <div className="flex items-center bg-midnight/80 backdrop-blur-sm p-4 rounded-lg border border-ivory/10 shadow-lg">
              <div className="mr-4 bg-plum/20 p-2 rounded-full">
                <ShoppingBag className="text-moss" size={20} />
              </div>
              <div>
                {cartItems.length < 5 ? (
                  <div className="text-center">
                    <p className="text-ivory/70 text-sm">
                      Add{" "}
                      <span className="font-bold text-ivory text-lg">
                        {5 - cartItems.length}
                      </span>{" "}
                      more
                    </p>
                    <p className="text-ivory/90">games to qualify</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-pine font-bold">Coupon Applied!</p>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-ivory/50">
                        {couponInfo.cheapestGame?.price}€
                      </span>
                      <span className="bg-moss/20 text-moss font-bold px-2 py-0.5 rounded">
                        FREE
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
