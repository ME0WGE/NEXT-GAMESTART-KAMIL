import { useAllGames } from "@/lib/hooks/useAllGames";
import { useEffect, useState } from "react";

export default function AllGames() {
  const [displayCount, setDisplayCount] = useState(10);
  const { loading, allGames, error, randomPriceOfAllGames } = useAllGames();

  const gamesPerRow = 1;
  const initialGamesCount = 10 * gamesPerRow;
  const batchSize = 20;

  const displayedGames = randomPriceOfAllGames?.slice(0, displayCount) || [];

  const handleAddToCart = (game) => {
    console.log("Ajout au panier:", game.title);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + batchSize);
  };

  const handleShowLess = () => {
    setDisplayCount(initialGamesCount);
  };

  return (
    <>
      <div className="grid-cols-1 grid gap-4">
        {loading & !error ? (
          <p>Chargement des jeux...</p>
        ) : (
          displayedGames.map((game) => (
            <div
              key={game.id}
              className="bg-midnight/50 text-ivory p-4 rounded-sm flex flex-col gap-2 backdrop-blur-sm border border-ivory/10 hover:border-ivory/20 hover:bg-midnight/70 hover:rounded-bl-4xl hover:rounded-tr-4xl transition-all duration-200">
              <div className="flex flex-row gap-2">
                <img src={game.thumbnail} alt={game.title} className="w-1/5" />
                <div className="flex flex-row justify-between gap-2 w-full items-center">
                  <h2 className="text-sm text-ivory font-bold">{game.title}</h2>
                  <span className="text-sm text-ivory">
                    Prix: {game.price},00€
                  </span>
                  <button
                    className="bg-rosy text-ivory px-4 py-2 rounded-lg hover:bg-pine hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103  transition-all duration-200"
                    onClick={() => handleAddToCart(game)}>
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {randomPriceOfAllGames?.length > displayCount && (
        <div className="mt-4 text-center">
          <button
            onClick={handleShowMore}
            className="bg-rosy text-ivory px-4 py-2 rounded-lg hover:bg-pine hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103 transition-all duration-200">
            Afficher plus
          </button>
        </div>
      )}
      {displayCount > initialGamesCount && (
        <div className="mt-4 text-center">
          <button
            onClick={handleShowLess}
            className="bg-midnight text-ivory px-4 py-2 rounded-lg hover:bg-pine hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103 ml-4 transition-all duration-200">
            Afficher moins
          </button>
        </div>
      )}
    </>
  );
}
