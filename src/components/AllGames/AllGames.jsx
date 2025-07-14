import { useAllGames } from "@/lib/hooks/useAllGames";
import { useState } from "react";

export default function AllGames() {
  const [showAll, setShowAll] = useState(false);
  const { loading, allGames, error } = useAllGames();

  const gamesPerRow = 1;
  const initialGamesCount = 10 * gamesPerRow;
  const displayedGames = showAll
    ? allGames
    : allGames.slice(0, initialGamesCount);
  const handleAddToCart = (game) => {
    console.log("Ajout au panier:", game.title);
  };

  return (
    <>
      <div className="grid-cols-1 grid gap-4">
        {displayedGames.map((game) => (
          <div
            key={game.id}
            className="bg-midnight/50 text-ivory p-4 rounded-sm flex flex-col gap-2 backdrop-blur-sm border border-ivory/10 hover:border-ivory/20 hover:bg-midnight/70 hover:rounded-bl-4xl hover:rounded-tr-4xl transition-all duration-200">
            <div className="flex flex-row gap-2">
              <img src={game.thumbnail} alt={game.title} className="w-1/5" />
              <div className="flex flex-row justify-between gap-2 w-full items-center">
                <h2 className="text-sm text-ivory font-bold">{game.title}</h2>
                <span className="text-sm text-ivory">Price: {game.price}</span>
                <button
                  className="bg-rosy text-ivory px-4 py-2 rounded-lg hover:bg-pine hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103  transition-all duration-200"
                  onClick={() => handleAddToCart(game)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
