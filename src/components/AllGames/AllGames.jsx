import { useAllGames } from "@/lib/hooks/useAllGames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/features/gameDetailsSlice";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function AllGames() {
  const [displayCount, setDisplayCount] = useState(10);
  const { loading, allGames, error, randomPriceOfAllGames } = useAllGames();
  const dispatch = useDispatch();
  const { addingToCart, cartItems } = useSelector((state) => state.gameDetails);
  const [addingGameId, setAddingGameId] = useState(null);
  const [removingGameId, setRemovingGameId] = useState(null);

  const gamesPerRow = 1;
  const initialGamesCount = 10 * gamesPerRow;
  const batchSize = 20;

  const displayedGames = randomPriceOfAllGames?.slice(0, displayCount) || [];

  // Check if a game is in the cart
  const isInCart = (gameId) => {
    return cartItems.some((item) => item.id === gameId);
  };

  // Handle add to cart
  const handleAddToCart = async (game, e) => {
    try {
      e.stopPropagation();
      setAddingGameId(game.id);
      // Add price if not present
      const gameWithPrice = {
        ...game,
        price: game.price || `${Math.floor(Math.random() * 96) + 5}.99`,
      };
      await dispatch(addToCart(gameWithPrice)).unwrap();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingGameId(null);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = async (gameId, e) => {
    try {
      e.stopPropagation();
      setRemovingGameId(gameId);
      await dispatch(removeFromCart(gameId)).unwrap();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setRemovingGameId(null);
    }
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
                  {isInCart(game.id) ? (
                    <button
                      className="bg-red-400 hover:bg-red-500 text-ivory px-4 py-2 rounded-lg hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                      onClick={(e) => handleRemoveFromCart(game.id, e)}
                      disabled={removingGameId === game.id}>
                      {removingGameId === game.id ? (
                        "Patientez..."
                      ) : (
                        <>
                          <Trash2 size={16} /> Retirer
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      className="bg-moss hover:bg-pine text-ivory px-4 py-2 rounded-lg hover:rounded-br-2xl hover:rounded-tl-2xl hover:scale-103 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                      onClick={(e) => handleAddToCart(game, e)}
                      disabled={addingToCart || addingGameId === game.id}>
                      {addingGameId === game.id ? (
                        "Patientez..."
                      ) : (
                        <>
                          <ShoppingCart size={16} /> Ajouter au panier
                        </>
                      )}
                    </button>
                  )}
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
