"use client";

import { useSelector } from "react-redux";

export default function PriceDisplay({ gameId, className = "" }) {
  const currentGame = useSelector((state) => state.gameDetails.currentGame);
  const { price, discount, discountedPrice } = currentGame || {};

  return (
    <div className={`text-2xl font-bold ${className}`}>
      {discount > 0 ? (
        <>
          <span className="line-through text-ivory/50 mr-2">{price}€</span>
          <span className="text-green-500">{discountedPrice}€</span>
          <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded">
            -{discount}%
          </span>
        </>
      ) : (
        <span>{price}€</span>
      )}
    </div>
  );
}
