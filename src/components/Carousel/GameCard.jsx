import Image from "next/image";
import { Percent } from "lucide-react";

export default function GameCard({
  game,
  size = "default",
  className = "",
  showDiscount = false,
}) {
  if (!game) {
    return null;
  }

  {
    /* --------------------------------------------------------------------|
    --------------------------- Size Classes ---------------------------|
  */
  }
  const sizeClasses = {
    small: "h-24",
    medium: "h-32",
    default: "h-40",
    large: "h-48",
  };

  {
    /* --------------------------------------------------------------------|
    --------------------------- Image Sizes ---------------------------|
  */
  }
  const imageSizes = {
    small: { width: 200, height: 96 },
    medium: { width: 300, height: 128 },
    default: { width: 400, height: 160 },
    large: { width: 500, height: 192 },
  };

  {
    /* --------------------------------------------------------------------|
    --------------------------- Current Size ---------------------------|
  */
  }
  const currentSize = imageSizes[size];

  return (
    <>
      {/* --------------------------------------------------------------------|
        --------------------------- Game Card -----------------------------|
      */}
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        {/* Game Image */}
        <div className={`relative ${sizeClasses[size]} w-full`}>
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover"
            sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`}
            priority={size === "large"}
          />

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Game Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <div className="flex items-end justify-between">
            {/* Game Title */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base truncate">
                {game.title}
              </h3>

              {/* Price Information */}
              <div className="flex items-center gap-2 mt-1">
                {/* Discount */}
                {showDiscount && game.discount && (
                  <div className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded text-xs font-bold">
                    <Percent size={12} />-{game.discount}%
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Current Price */}
                  {game.currentPrice && (
                    <span className="text-yellow-400 font-bold text-sm">
                      €{game.currentPrice}
                    </span>
                  )}

                  {/* Original Price */}
                  {showDiscount &&
                    game.originalPrice &&
                    game.originalPrice !== game.currentPrice && (
                      <span className="text-gray-400 line-through text-xs">
                        €{game.originalPrice}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-yellow-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    </>
  );
}
