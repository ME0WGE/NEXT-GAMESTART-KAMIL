import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/lib/features/gameSlice";

export const useMostPlayedGames = () => {
  const dispatch = useDispatch();
  const { loading, mostPlayedGames } = useSelector((state) => state.game);

  // Load the most played games
  const loadMostPlayedGames = async () => {
    dispatch(setLoading(true));
  };

  // Load the data on component mount
  useEffect(() => {
    if (mostPlayedGames.length === 0) {
      loadMostPlayedGames();
    }
  }, [dispatch]);

  return {
    mostPlayedGames,
    loading,
    loadMostPlayedGames,
  };
};
