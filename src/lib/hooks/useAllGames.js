import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  setAllGames,
  setError,
  setLoading,
} from "../features/gameSlice";
import { apiService } from "../services/apiService";
import { useEffect } from "react";

export const useAllGames = () => {
  const dispatch = useDispatch();
  const { loading, allGames, error } = useSelector((state) => state.game);

  const loadAllGames = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const games = await apiService.getAllGames();
      dispatch(setAllGames(games));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(`Erreur lors du chargement de tout les jeux: ${error}`);
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    if (allGames.length === 0) {
      loadAllGames();
    }
  }, [dispatch]);

  return {
    allGames,
    loading,
    error,
    loadAllGames,
  };
};
